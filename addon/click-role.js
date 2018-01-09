import Ember from 'ember';

Ember.Test.registerHelper('clickRole', function(app, ...roles) {
  const selector = roles.map((role) => `[data-role="${role}"]`).join(' ');

  return click(selector);
});
