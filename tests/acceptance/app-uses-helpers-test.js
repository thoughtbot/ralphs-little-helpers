import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';
import {
  clickOn,
  clickRole,
  fillInField,
  findRole,
} from 'ember-tb-test-helpers';

module('Acceptance | App uses helpers', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('finders', assert => {
  visit('/');

  clickOn('Checkbox!');
  clickOn('Submit!');
  clickRole('outer', 'middle', 'inner', 'checkbox');
  fillInField('the-input', 'fillInField');

  andThen(() => {
    assert.hasClass('.included', 'included');
    assert.hasClass(findWithAssert('.included'), 'included');
    assert.textEqual(
      findRole('outer', 'middle', 'inner'),
      'findRole',
      'findRole finds by `[data-role]`'
    );
    assert.textEqual(
      findWithAssert('[name="the-input"]').val(),
      'fillInField',
      'fillInField fills inputs by `[name]`'
    );
    assert.ok(
      findWithAssert('#labelled-checkbox').prop('checked'),
      'clickOn finds by `:contains`'
    );
    assert.ok(
      findWithAssert('#submitted'),
      'clickOn finds by `[value]` works'
    );
    assert.ok(
      findWithAssert('#checkbox-role').prop('checked'),
      'clickRole finds by `[data-role]`'
    );
  });
});

test('include and notInclude matchers', assert => {
  visit('/');

  andThen(() => {
    const theText = findWithAssert('#the-text');

    assert.include(theText, 'needle', 'the text includes the search term');
    assert.notInclude(theText, 'haystack', 'the text excludes a bad term');
  });
});

test('within', assert => {
  visit('/');

  within('form .included', scope => {
    scope.click('[type="checkbox"]');
    scope.fillIn('[type="text"]', 'scoped');

    andThen(() => {
      const submit = scope.find('[type="submit"]');
      const button = scope.findWithAssert('button');

      assert.ok(
        findWithAssert('#included-checkbox').prop('checked'),
        'scoped `click` works'
      );
      assert.textEqual(
        findWithAssert('#included-text').val(),
        'scoped',
        'scoped `fillIn` works'
      );

      assert.ok(
        !findWithAssert('#excluded-checkbox').prop('checked'),
        'scoped `click` works'
      );
      assert.textEqual(
        findWithAssert('#excluded-text').val(),
        '',
        'scoped `fillIn` works'
      );

      assert.equal(submit.length, 1, 'scoped `find` works');
      assert.textEqual(submit.val(), 'included', 'scoped `find` works');
      assert.equal(button.length, 1, 'scoped `findWithAssert` works');
      assert.textEqual(button, 'included', 'scoped `findWithAssert` works');
    });
  });
});

test('within raises warnings', assert => {
  within('', scope => {
    assert.throws(
      () => scope.visit('ignore'),
      Ember.Error,
      'throws error for `visit`'
    );
    assert.throws(
      () => scope.currentPath(),
      Ember.Error,
      'throws error for `currentPath`'
    );
    assert.throws(
      () => scope.currentRouteName(),
      Ember.Error,
      'throws error for `currentRouteName`'
    );
    assert.throws(
      () => scope.currentURL(),
      Ember.Error,
      'throws error for `currentURL`'
    );
  });
});

test('scoped within', assert => {
  visit('/');

  within('form .included', scope => {
    scope.within('.inner-included', innerScope => {
      andThen(() => {
        assert.ok(innerScope.findWithAssert('span'), 'nested within works');
      });
    });
  });
});
