master
------

* Split synchronous finders (like `findRole`) from asynchronous test helpers
  (like `clickOn`), and modifies the way they're imported and utilized.

0.0.5
-----

* When an QUnit matcher fails, the message includes both the default
  failure message and any user-provided failure message. [#11]

[#11]: https://github.com/thoughtbot/ralphs-little-helpers/pull/11

0.0.4
-----

* Fix `assert.include` and `assert.notInclude` default failure message.
* Introduce `check` and `uncheck` global async helpers.
  Introduce `assert.checked` and `assert.unchecked`. [#9]

[#9]: https://github.com/thoughtbot/ralphs-little-helpers/pull/9

0.0.3
-----

* Introduce `assert.hasClass` matcher

0.0.2
-----

* Introduce `within` helper, for scoping helpers to a selector

0.0.1
-----

* Initial implementation
