import Ember from 'ember';

Ember.Test.registerHelper('fillInField', function(app, field, value) {
  const {
    fillIn
  } = app.testHelpers;

  return fillIn(`[name='${field}']`, value);
});
