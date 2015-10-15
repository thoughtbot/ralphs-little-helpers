import Ember from 'ember';

export default Ember.Controller.extend({
  submitted: false,

  actions: {
    submit() {
      this.set('submitted', true);
    }
  },
});
