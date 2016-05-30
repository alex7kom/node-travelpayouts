/* eslint max-len: "off" */
/* eslint no-magic-numbers: "off" */
/* eslint camelcase: "off" */
/* eslint no-magic-numbers: "off" */
/* eslint no-unused-vars: "off" */
/* eslint-env mocha */

var expect = require('chai').expect;

var travelpayoutsAPI = require('..');

var token = global.token;

if (!token) {
  token = require('minimist')(process.argv.slice(2)).token;
}

var tapi = travelpayoutsAPI({ token: token });
var tapiNoToken = travelpayoutsAPI();

describe('prices#latest', function () {
  var params = {
    currency: 'rub',
    period_type: 'year',
    page: 1,
    limit: 30,
    show_to_affiliates: true,
    sorting: 'price',
    trip_class: 0
  };

  it('should return a list', function (done) {
    tapi.prices.latest(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Array);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.prices.latest(params, function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('prices#monthMatrix', function () {
  var params = {
    currency: 'rub',
    origin: 'LED',
    destination: 'HKT',
    show_to_affiliates: true
  };

  it('should return a list', function (done) {
    tapi.prices.monthMatrix(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Array);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.prices.monthMatrix(params, function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('prices#weekMatrix', function () {
  var params = {
    currency: 'rub',
    origin: 'LED',
    destination: 'HKT',
    show_to_affiliates: true,
    depart_date: '2016-09-04',
    return_date: '2016-09-18'
  };

  it('should return a list', function (done) {
    tapi.prices.weekMatrix(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Array);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.prices.weekMatrix(params, function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('prices#nearestPlacesMatrix', function () {
  var params = {
    currency: 'rub',
    origin: 'LED',
    destination: 'HKT',
    show_to_affiliates: true
  };

  it('should return an object with origins and destinations', function (done) {
    tapi.prices.nearestPlacesMatrix(params, function (err, result) {
      if (err) throw err;
      expect(result).to.have.ownProperty('origins');
      expect(result).to.have.ownProperty('destinations');
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.prices.nearestPlacesMatrix(params, function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('prices#cheap', function () {
  var params = {
    origin: 'MOW',
    destination: 'HKT',
    depart_date: '2016-11',
    return_date: '2016-12'
  };

  it('should return an object', function (done) {
    tapi.prices.cheap(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.prices.cheap(params, function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('prices#monthly', function () {
  var params = {
    currency: 'RUB',
    origin: 'MOW',
    destination: 'HKT'
  };

  it('should return an object', function (done) {
    tapi.prices.monthly(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.prices.monthly(params, function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('prices#direct', function () {
  var params = {
    origin: 'MOW',
    destination: 'HKT',
    depart_date: '2016-11',
    return_date: '2016-12'
  };

  it('should return an object', function (done) {
    tapi.prices.direct(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.prices.direct(params, function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('prices#calendar', function () {
  var params = {
    depart_date: '2016-11',
    origin: 'MOW',
    destination: 'BCN',
    calendar_type: 'departure_date'
  };

  it('should return an object', function (done) {
    tapi.prices.calendar(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.prices.calendar(params, function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('prices#holidaysByRoutes', function () {
  it('should return an object', function (done) {
    tapi.prices.holidaysByRoutes(function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.prices.holidaysByRoutes(function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('statistics#balance', function () {
  it('should return an object', function (done) {
    tapi.statistics.balance(function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.statistics.balance(function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('statistics#payments', function () {
  it('should return an object', function (done) {
    tapi.statistics.payments(function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.statistics.payments(function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('statistics#sales', function () {
  var params = {
    group_by: 'date',
    month: '2015-05-14',
    host_filter: null,
    marker_filter: null
  };

  it('should return an object', function (done) {
    tapi.statistics.sales(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.statistics.sales(params, function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('statistics#detailedSales', function () {
  var params = {
    group_by: 'date_marker',
    month: '2015-05-14',
    host_filter: null,
    marker_filter: null
  };

  it('should return an object', function (done) {
    tapi.statistics.detailedSales(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.statistics.detailedSales(params, function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('map#directions', function () {
  var params = {
    origin_iata: 'LED',
    one_way: false,
    locale: 'ru'
  };

  it('should return an object', function (done) {
    tapi.map.directions(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });
});

describe('map#prices', function () {
  var params = {
    origin_iata: 'LED',
    period: '2014-12-01:season',
    direct: true,
    one_way: false,
    price: '50000',
    no_visa: true,
    schengen: true,
    need_visa: true,
    locale: 'ru',
    min_trip_duration_in_days: 13,
    max_trip_duration_in_days: 15
  };

  it('should return a list', function (done) {
    tapi.map.prices(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Array);
      done();
    });
  });
});

describe('minPricesCalendar', function () {
  var params = {
    origin: 'MOW',
    destination: 'LED',
    depart_date: '2016-05-30',
    one_way: false
  };

  it('should return an object', function (done) {
    tapi.minPricesCalendar(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });
});

describe('directions#airline', function () {
  var params = {
    airline_code: 'SU',
    limit: 10
  };

  it('should return an object', function (done) {
    tapi.directions.airline(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.directions.airline(params, function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('directions#city', function () {
  var params = {
    origin: 'MOW',
    currency: 'usd'
  };

  it('should return an object', function (done) {
    tapi.directions.city(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });

  it('should return an error without token', function (done) {
    tapiNoToken.directions.city(params, function (err, result) {
      expect(String(err)).to.be.eql('Error: Unauthorized');
      done();
    });
  });
});

describe('specialOffers', function () {
  it('should return a list', function (done) {
    tapi.specialOffers(function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Array);
      expect(result[0]).to.have.ownProperty('description');
      expect(result[0]).to.have.ownProperty('conditions');
      expect(result[0]).to.have.ownProperty('routes');
      done();
    });
  });
});

describe('whereami', function () {
  var params = {
    locale: 'ru',
    ip: '62.105.128.0'
  };

  it('should return an object', function (done) {
    tapi.whereami(params, function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      expect(result).to.have.ownProperty('iata');
      expect(result).to.have.ownProperty('name');
      done();
    });
  });
});

describe('currency', function () {
  it('should return an object', function (done) {
    tapi.currency(function (err, result) {
      if (err) throw err;
      expect(result).to.be.an.instanceof(Object);
      done();
    });
  });
});
