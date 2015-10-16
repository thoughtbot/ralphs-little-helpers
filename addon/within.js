import Ember from 'ember';
import Scope from './scope';

Ember.Test.registerHelper('within', function(app, selector, block) {
  const {
    wait
  } = app.testHelpers;

  block(new Scope(app, selector));

  return wait();
});
