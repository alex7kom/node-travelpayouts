var querystring = require('querystring');

var request = require('request');
var lodash = require('lodash');
var parseXMLString = require('xml2js').parseString;

var signature = require('./signature');

var APIEndpoint = 'http://api.travelpayouts.com/';

var defaultTimeout = 10000;

module.exports = function (opts) {
  var options = opts || {};

  var cleanRequestDefaults = {};
  var tokenRequestDefaults = {};

  if (options.requestOptions) {
    cleanRequestDefaults = lodash.cloneDeep(options.requestOptions);
    tokenRequestDefaults = lodash.cloneDeep(options.requestOptions);
  }

  cleanRequestDefaults.gzip = tokenRequestDefaults.gzip = true;
  tokenRequestDefaults.json = true;

  cleanRequestDefaults.timeout
    = cleanRequestDefaults.timeout || defaultTimeout;

  tokenRequestDefaults.timeout
    = tokenRequestDefaults.timeout || defaultTimeout;

  if (options.token) {
    tokenRequestDefaults.headers = tokenRequestDefaults.headers || {};
    tokenRequestDefaults.headers['X-Access-Token'] = options.token;
  }

  var main = {
    marker: options.marker,
    token: options.token,
    host: options.host,
    signature: signature(options.marker, options.token),
    cleanRequest: request.defaults(cleanRequestDefaults),
    tokenRequest: request.defaults(tokenRequestDefaults)
  };

  return {
    flight: {
      search: flightSearchRequest.bind(main),
      results: flightSearchResultsRequest.bind(main),
      click: flightSearchClickRequest.bind(main)
    },
    prices: {
      latest: doRequest.bind(main, 'v2/prices/latest'),
      monthMatrix: doRequest.bind(main, 'v2/prices/month-matrix'),
      weekMatrix: doRequest.bind(main, 'v2/prices/week-matrix'),
      nearestPlacesMatrix:
        doRequest.bind(main, 'v2/prices/nearest-places-matrix'),
      cheap: doRequest.bind(main, 'v1/prices/cheap'),
      monthly: doRequest.bind(main, 'v1/prices/monthly'),
      direct: doRequest.bind(main, 'v1/prices/direct'),
      calendar: doRequest.bind(main, 'v1/prices/calendar'),
      holidaysByRoutes: doRequest.bind(main, 'v2/prices/holidays-by-routes')
    },
    statistics: {
      balance: doRequest.bind(main, 'v2/statistics/balance'),
      payments: doRequest.bind(main, 'v2/statistics/payments'),
      sales: doRequest.bind(main, 'v2/statistics/sales'),
      detailedSales: doRequest.bind(main, 'v2/statistics/detailed-sales')
    },
    map: {
      directions: map.bind(main, 'supported_directions.json'),
      prices: map.bind(main, 'prices.json')
    },
    directions: {
      airline: doRequest.bind(main, 'v1/airline-directions'),
      city: doRequest.bind(main, 'v1/city-directions')
    },
    minPricesCalendar: minPricesCalendar.bind(main),
    specialOffers: specialOffers.bind(main),
    whereami: whereami.bind(main),
    currency: currency.bind(main)
  };
};

var doRequest = function (path, _params, _callback) {
  var params;
  var callback = _callback;

  if (typeof _params === 'function') {
    callback = _params;
  } else {
    params = _params;
  }

  var uri = APIEndpoint + path;
  if (params) {
    uri += '?' + stringifyQuery(params);
  }

  this.tokenRequest.get({
    uri: uri
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }
    if (body && !body.success && body.message) {
      return callback(new Error(body.message));
    }
    if (!body || (response && response.statusCode !== 200)) {
      return callback(
        new Error((response && response.statusCode) || 'Unknown error')
      );
    }

    return callback(null, body.data);
  });
};

var flightSearchRequest = function (params, callback) {
  params.marker = this.marker;
  params.host = this.host;
  params.signature = this.signature.flightSearch(params);

  this.cleanRequest.post({
    uri: APIEndpoint + 'v1/flight_search',
    body: JSON.stringify(params)
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }
    if (!body || (response && response.statusCode !== 200)) {
      return callback(
        new Error(body || (response && response.statusCode) || 'Unknown error')
      );
    }

    try {
      var result = JSON.parse(body);

      return callback(null, result);
    } catch (err) {
      return callback(err);
    }
  });
};

var flightSearchResultsRequest = function (params, callback) {
  this.cleanRequest.get({
    uri: APIEndpoint
      + 'v1/flight_search_results?'
      + stringifyQuery(params),
    json: true
  }, genericCallback.bind(null, callback));
};

var flightSearchClickRequest = function (params, callback) {
  this.cleanRequest.get({
    uri: APIEndpoint
      + 'v1/flight_searches/'
      + params.uuid
      + '/clicks/'
      + params.terms_url
      + '.json',
    json: true
  }, genericCallback.bind(null, callback));
};

var whereami = function (params, callback) {
  this.cleanRequest.get({
    uri: 'http://www.travelpayouts.com/whereami?callback=cb&'
      + stringifyQuery(params)
  }, genericCallback.bind(null, function (error, body) {
    if (error) {
      return callback(error);
    }

    try {
      var resultStr = body
        .replace(/^cb\(/, '')
        .replace(/;$/, '')
        .replace(/\)$/, '');
      var data = JSON.parse(resultStr);

      return callback(null, data);
    } catch (err) {
      return callback(err);
    }
  }));
};

var specialOffers = function (callback) {
  this.cleanRequest.get({
    uri: APIEndpoint + 'v2/prices/special-offers'
  }, genericCallback.bind(null, function (error, body) {
    if (error) {
      return callback(error);
    }

    parseXMLString(body, function (err, result) {
      if (err) {
        return callback(err);
      }

      var offers = [];
      result.offers.offer.forEach(function (item) {
        var offer = item.$;
        offer.description = item.description;
        offer.conditions = item.conditions;
        offer.routes = [];
        item.route.forEach(function (route) {
          offer.routes.push(route.$);
        });
        offers.push(offer);
      });

      return callback(null, offers);
    });
  }));
};

var currency = function (callback) {
  this.cleanRequest.get({
    uri: 'http://yasen.aviasales.ru/adaptors/currency.json',
    json: true
  }, genericCallback.bind(null, callback));
};

var map = function (path, params, callback) {
  this.cleanRequest.get({
    uri: 'http://map.aviasales.ru/' + path
      + '?' + stringifyQuery(params),
    json: true
  }, genericCallback.bind(null, callback));
};

var minPricesCalendar = function (params, callback) {
  this.cleanRequest.get({
    uri: 'http://min-prices.aviasales.ru/calendar_preload?'
      + stringifyQuery(params),
    json: true
  }, genericCallback.bind(null, callback));
};

var genericCallback = function (callback, error, response, body) {
  if (error) {
    return callback(error);
  }
  if (!body || (response && response.statusCode !== 200)) {
    return callback(
      new Error((response && response.statusCode) || 'Unknown error')
    );
  }
  callback(null, body);
};

var stringifyQuery = function (_params) {
  var params = {};

  Object.keys(_params).forEach(function (key) {
    if (_params[key] === null) {
      return (params[key] = 'null');
    }
    params[key] = _params[key];
  });

  return querystring.stringify(params);
};
