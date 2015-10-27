import QUnit from 'qunit';

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

QUnit.assert.textEqual = function   (actual, expected, message) {
  const actualString = normalizeString(actual);

  const trimActual = actualString
    .toString()
    .replace(/^\s+|\s+$/g, '')
    .replace('\n', ' ');

  this.equal(trimActual, expected, message);
};

QUnit.assert.include = function(actual, expected, message) {
  const actualString = normalizeString(actual);

  if(!message) {
    message = `Expected '${actual}' to include '${expected}'`;
  }

  this.ok(actualString.indexOf(expected) !== -1, message);
};

QUnit.assert.notInclude = function(actual, expected, message) {
  const actualString = normalizeString(actual);

  if (!message) {
    message = `Expected '${actual}' not to include '${expected}'.`;
  }

  this.ok(actualString.indexOf(expected) === -1, message);
};
