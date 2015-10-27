import Ember from 'ember';
import QUnit from 'qunit';

const { assert } = QUnit;

function normalizeString(actual) {
  if (!actual) {
    actual = '';
  }

  if (typeof actual.text === 'function') {
    return actual.text();
  } else {
    return actual.toString();
  }
}

assert.textEqual = function(actual, expected, message) {
  const actualString = normalizeString(actual);

  const trimActual = actualString
    .toString()
    .replace(/^\s+|\s+$/g, '')
    .replace('\n', ' ');

  this.equal(trimActual, expected, message);
};

assert.include = function(actual, expected, message) {
  const actualString = normalizeString(actual);

  if (!message) {
    message = `Expected '${actual}' to include '${expected}'`;
  }

  this.ok(actualString.indexOf(expected) !== -1, message);
};

assert.notInclude = function(actual, expected, message) {
  const actualString = normalizeString(actual);

  if (!message) {
    message = `Expected '${actual}' not to include '${expected}'.`;
  }

  this.ok(actualString.indexOf(expected) === -1, message);
};

assert.hasClass = function(selectorOrNode, expected, message) {
  const node = Ember.$(selectorOrNode);
  const classes = node.prop('class');

  if (!message) {
    message = `expected node to include "${expected}" class in "${classes}"`;
  }

  this.ok(node.hasClass(expected.toString()), message);
};
