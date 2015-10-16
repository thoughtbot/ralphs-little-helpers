import Ember from 'ember';

const BLACKLISTED_HELPERS = [
  'visit',
  'currentPath',
  'currentRouteName',
  'currentURL',
];

function defineTestHelpers(context) {
  Object.keys(context.app.testHelpers).forEach(name => {
    const helper = context.app.testHelpers[name];
    context[name] = function(selector, ...args) {
      return helper(`${context.selector} ${selector}`, ...args);
    }.bind(context);
  });
}

function blacklistTestHelpers(context) {
  BLACKLISTED_HELPERS.forEach(name => {
    context[name] = function() {
      throw new Ember.Error(
        `Unexpected call to 'scope.${name}'. Scopes created by 'within' only
        support Ember test helpers that accept a selector as the
        first argument.`
      );
    }.bind(context);
  });
}

class Scope {
  constructor(app, selector) {
    this.app = app;
    this.selector = selector;
    defineTestHelpers(this);
    blacklistTestHelpers(this);
  }

  within(selector, block, ...args) {
    return block(new Scope(this.app, `${this.selector} ${selector}`, ...args));
  }
}

export default Scope;
