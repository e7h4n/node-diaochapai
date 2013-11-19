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
                appid: 123,
                secret: 456,
                survey: 789
            });
        });

        describe('#exists', function () {
            it('takes 2 arguments', function () {
                assert.equal(survey.exists.length, 2, 'take 2 arguments');
            });

            it.skip('return false if user is not exists', function (done) {
                survey.exists(456, function (err, result) {
                    assert.notOk(result.response, 'use not exists');
                    done();
                });
            });

            it.skip('return true if user is exists', function (done) {
                survey.exists(567, function (err, result) {
                    assert.ok(result.response, 'use exists');
                    done();
                });
            });
        });

        describe('#getUrl', function () {
            it('should make a correct url', function () {
                var url = survey.getUrl(123, {
                    'return_url': 'http://a/b/c',
                    expire: 1384872200
                });

                var accureUrl = require('url').parse(url);
                accureUrl.query = require('querystring').parse(accureUrl.query);
                delete accureUrl.search;
                delete accureUrl.path;
                delete accureUrl.href;

                var expectUrl = require('url').parse('http://www.diaochapai.com/api/survey?survey=789&uid=123&appid=123&return_url=http%3A%2F%2Fa%2Fb%2Fc&expire=1384872200&sign=26204411b0079ff4ddd673c603fb7156');
                expectUrl.query = require('querystring').parse(expectUrl.query);
                delete expectUrl.search;
                delete expectUrl.path;
                delete expectUrl.href;

                assert.deepEqual(accureUrl, expectUrl, 'generate correct url');
            });
        });
    });
});
