import Ember from 'ember';

Ember.Test.registerHelper('clickOn', function(app, text) {
  const {
    click
  } = app.testHelpers;

  return click(`:contains("${text}"), [value="${text}"]`);
});
