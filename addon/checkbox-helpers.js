import Ember from 'ember';

const { assert, run } = Ember;

function ensureCheckState(isChecked, app, selector, context) {
  const {
    click,
    findWithAssert
  } = app.testHelpers;
  const word = isChecked ? 'check' : 'uncheck';

  const $element = findWithAssert(selector, context);
  assert(
    `To ${word} '${selector}', the input must be a checkbox`,
    $element.prop('type') === 'checkbox'
  );

  run(() => {
    if ($element.is(':checked') !== isChecked) {
      click($element);
    }
  });
}

Ember.Test.registerAsyncHelper('check', function() {
  ensureCheckState(true, ...arguments);
});

Ember.Test.registerAsyncHelper('uncheck', function() {
  ensureCheckState(false, ...arguments);
});
