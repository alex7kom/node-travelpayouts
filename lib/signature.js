var crypto = require('crypto');

var lodash = require('lodash');

module.exports = function (marker, token) {
  return {
    flightSearch: createFlightSearchSignature.bind(null, marker, token)
  };
};

var createFlightSearchSignature = function (marker, token, _params) {
  var params = lodash.cloneDeep(_params);
  params.marker = marker;

  var paramsArray = paramsToArray(params);
  paramsArray = sortParams(paramsArray);
  paramsArray = flattenParams(paramsArray);

  return createMD5(token + ':' + paramsArray.join(':'));
};

var paramsToArray = function (params) {
  var res = [];

  if (typeof params === 'object' && params.length != null) {
    params.forEach(function (param) {
      res.push(paramsToArray(param));
    });
  } else if (typeof params === 'object' && params.length == null) {
    Object.keys(params).forEach(function (key) {
      res.push([key, paramsToArray(params[key]), '@']);
    });
  } else {
    res = params;
  }

  return res;
};

var sortParams = function (params) {
  var res = [];

  if (typeof params === 'object' && params.length != null) {
    params.forEach(function (param) {
      res.push(sortParams(param));
    });
    if (typeof params[0] === 'object') {
      return res.sort(function (a, b) {
        if (a[0] < b[0]) {
          return -1;
        }

        if (a[0] > b[0]) {
          return 1;
        }

        return 0;
      });
    }

    return res;
  }

  return params;
};

var flattenParams = function (params) {
  var res = [];

  if (typeof params !== 'object') {
    return [params];
  }

  params.forEach(function (param) {
    if (
      typeof param === 'object'
      && param.length === 3
      && param[2] === '@'
    ) {
      res = res.concat(flattenParams(param[1]));

      return;
    }
    if (typeof param === 'object') {
      res = res.concat(flattenParams(param));

      return;
    }
    res.push(param);
  });

  return res;
};

var createMD5 = function (data) {
  var md5 = crypto.createHash('md5');
  md5.end(data);

  return md5.read().toString('hex');
};
