/* eslint max-len: "off" */
/* eslint no-magic-numbers: "off" */
/* eslint camelcase: "off" */
/* eslint no-magic-numbers: "off" */
/* eslint no-unused-vars: "off" */
/* eslint-env mocha */

var expect = require('chai').expect;

var signature = require('../lib/signature')(global.marker, global.token);

describe('signature#flightSearch', function () {
  var params = {
    host: global.host,
    user_ip: '127.0.0.1',
    locale: 'ru',
    trip_class: 'Y',
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    segments: [
      {
        origin: 'NYC',
        destination: 'LAX',
        date: '2016-11-25'
      },
      {
        origin: 'LAX',
        destination: 'NYC',
        date: '2016-12-18'
      }
    ]
  };

  it('should generate correct signature', function () {
    expect(signature.flightSearch(params)).to.be.eql('7f49a3e9237d569316e57bd05f158d1b');
  });

});
