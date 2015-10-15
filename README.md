# ember-tb-test-helpers

This README outlines the details of collaborating on this Ember addon.
## Usage

First, install the addon:

    $ ember install ember-tb-test-helpers

Then, import the helpers you need:

```js
import { clickOn, findRole } from 'ember-tb-test-helpers';

test('it works', assert => {
  clickOn('Foo!');

  andThen(() => {
    assert.notInclude(findRole('foo').text(), 'bar', 'foo is not bar');
  });
});
```

To use the matchers, import them in your test helper:

```js
// tests/test-helper.js
import 'ember-tb-test-helpers/extend-qunit';
```

## Helpers

* `clickOn(text)` - Clicks on elements containing the text
* `clickRole(role)` - Clicks on elements with a matching `[data-role]`
* `findRole(role)` - Finds (with assert) an element with matching `[data-role]`
* `fillInField(name, value)` - Fills in a field with a `[name]` with the given
  value

## QUnit Matchers

* `assert.include(needle, haystack)` - Asserts that the `needle` string is
  included in the `haystack` string
* `assert.notInclude(needle, haystack)` - Asserts that the `needle` string is
  included in the `haystack` string
* `assert.textEqual(expected, actual)` - Asserts that the `expected` string or
  node's text equals the `actual` string

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
