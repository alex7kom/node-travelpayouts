/* eslint max-len: "off" */
/* eslint no-magic-numbers: "off" */
/* eslint camelcase: "off" */
/* eslint no-magic-numbers: "off" */
/* eslint no-unused-vars: "off" */
/* eslint-env mocha */

var expect = require('chai').expect;

var travelpayoutsAPI = require('..');

var opts = {
  token: global.token,
  marker: global.marker,
  host: global.token
};

if (!global.token) {
  var argv = require('minimist')(process.argv.slice(2));
  opts.token = argv.token;
  opts.marker = argv.marker;
  opts.host = argv.host;
}

var tapi = travelpayoutsAPI(opts);

describe('flight#search', function () {
  var params = {
    'user_ip': '127.0.0.1',
    'locale': 'ru',
    'trip_class': 'Y',
    'passengers': {
      'adults': 1,
      'children': 0,
      'infants': 0
    },
    'segments': [
      {
        'origin': 'NYC',
        'destination': 'LAX',
        'date': '2016-11-25'
      },
      {
        'origin': 'LAX',
        'destination': 'NYC',
        'date': '2016-12-18'
      }
    ]
  };

  it('should return an object with a search_id', function (done) {
    tapi.flight.search(params, function (err, result) {
      if (err) throw err;
      expect(result).to.have.ownProperty('search_id');
      done();
    });
  });
});

describe('flight#results', function () {
  var params = {
    uuid: 'c9c6de8c-3fb4-404e-b88c-e9e0a605f183'
  };

  it('should return a list', function (done) {
    tapi.flight.results(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Array);
      done();
    });
  });
});

describe('flight#click', function () {
  var params = {
    uuid: 'c9c6de8c-3fb4-404e-b88c-e9e0a605f183',
    terms_url: 2000001
  };

  it('should return an object', function (done) {
    tapi.flight.click(params, function (err, result) {
      if (err) throw err;
      expect(result).to.have.ownProperty('params');
      expect(result).to.have.ownProperty('url');
      done();
    });
  });
});
