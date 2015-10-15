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
