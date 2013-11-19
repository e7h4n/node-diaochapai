/*global describe, it, beforeEach*/

'use strict';

var assert = require('chai').assert;
var Survey = require('../').Survey;

describe('Survey', function () {
    describe('#initialize', function () {
        it('should take 1 argument', function () {
            assert.isFunction(Survey);
            assert.equal(Survey.length, 1, 'take 1 argument');
        });
    });

    describe('object', function () {
        var survey = null;
        beforeEach(function () {
            survey = new Survey({
                appId: 123,
                secret: 456,
                survey: 789
            });
        });

        describe('#exists', function () {
            it('takes 2 arguments');
            it('return false if user is not exists');
            it('return true if user is exists');
        });

        describe('#getUrl', function () {
            it('should generate right url');
        });
    });
});
