'use strict';

function makeSignString(params, secret) {
    var sign = Object.keys(params).sort().reduce(function (memo, key) {
        return memo + key + '=' + encodeURIComponent(params[key]) + '|';
    }, '');

    sign += secret;

    var shasum = require('crypto').createHash('md5');
    shasum.update(sign);

    return shasum.digest('hex');
}

var Survey = function (options) {
    this.appid = options.appid;
    this.survey = options.survey;
    this.secret = options.secret;
};

Survey.prototype.exists = function (uid, callback) {
    var params = {
        survey: this.survey,
        uid: uid,
        appid: this.appid
    };

    params.sign = makeSignString(params, this.secret);

    var url = require('url').format({
        protocol: 'http',
        hostname: 'www.diaochapai.com',
        pathname: '/api/response/uid/exist',
        query: params
    });

    return require('request')(url, callback);
};

Survey.prototype.getUrl = function (uid, options) {
    var params = {
        survey: this.survey,
        appid: this.appid,
        uid: uid
    };

    Object.keys(options || {}).forEach(function (key) {
        params[key] = options[key];
    });

    params.sign = makeSignString(params, this.secret);

    return require('url').format({
        protocol: 'http',
        hostname: 'www.diaochapai.com',
        pathname: '/api/survey',
        query: params
    });
};

exports.Survey = Survey;
