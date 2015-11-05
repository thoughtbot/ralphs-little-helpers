import Ember from 'ember';
import QUnit from 'qunit';

const { assert } = QUnit;

function failureMessage(base, custom) {
  if (custom) {
    return `${base}: ${custom}`;
  } else {
    return base;
  }
}

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

assert.textEqual = function(actual, expected, custom) {
  const actualString = normalizeString(actual);

  const trimActual = actualString
    .toString()
    .replace(/^\s+|\s+$/g, '')
    .replace('\n', ' ');

  this.equal(trimActual, expected, custom);
};

assert.include = function(actual, expected, custom) {
  const actualString = normalizeString(actual);
  const message = `Expected '${actualString}' to include '${expected}'`;

  this.ok(
    actualString.indexOf(expected) !== -1,
    failureMessage(message, custom)
  );
};

assert.notInclude = function(actual, expected, custom) {
  const actualString = normalizeString(actual);
  const message = `Expected '${actualString}' not to include '${expected}'`;

  this.ok(
    actualString.indexOf(expected) === -1,
    failureMessage(message, custom)
  );
};

assert.hasClass = function(selectorOrNode, expected, custom) {
  const node = Ember.$(selectorOrNode);
  const classes = node.prop('class');
  const message = `expected node to include "${expected}" class in "${classes}"`;

  this.ok(
    node.hasClass(expected.toString()),
    failureMessage(message, custom)
  );
};

assert.checked = function(selectorOrNode, custom) {
  const node = Ember.$(selectorOrNode);
  const checked = node.is(':checked');
  const message = `expected node (${selectorOrNode.toString()}) to be checked`;

  this.ok(
    checked,
    failureMessage(message, custom)
  );
};

assert.unchecked = function(selectorOrNode, custom) {
  const node = Ember.$(selectorOrNode);
  const unchecked = !node.is(':checked');
  const message = `expected node (${selectorOrNode.toString()}) to be unchecked`;

  this.ok(
    unchecked,
    failureMessage(message, custom)
  );
};
