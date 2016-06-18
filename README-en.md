# Travelpayouts (JetRadar/Aviasales) API for Node.js

[![Build Status](https://travis-ci.org/Alex7Kom/node-travelpayouts.svg?branch=master)](https://travis-ci.org/Alex7Kom/node-travelpayouts)
[![David](https://david-dm.org/Alex7Kom/node-travelpayouts.svg)](https://david-dm.org/Alex7Kom/node-travelpayouts)

[На русском](README.md)

A (minimalistic) wrapper for Travelpayouts (JetRadar/Aviasales).

The following APIs are supported.

* Data Access API

* Flight Search API

* Affiliate Statistics API

**See also**: a module for working with Travelpayouts data files: [travelpayouts-data](https://github.com/Alex7Kom/node-travelpayouts-data).

**Table of Contents**
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Use](#use)
- [API](#api)
  - [travelpayoutsAPI([options])](#travelpayoutsapioptions)
  - [All methods](#all-methods)
  - [Prices](#prices)
    - [prices.latest(options, callback)](#priceslatestoptions-callback)
    - [prices.monthMatrix(options, callback)](#pricesmonthmatrixoptions-callback)
    - [prices.weekMatrix(options, callback)](#pricesweekmatrixoptions-callback)
    - [prices.nearestPlacesMatrix(options, callback)](#pricesnearestplacesmatrixoptions-callback)
    - [prices.cheap(options, callback)](#pricescheapoptions-callback)
    - [prices.monthly(options, callback)](#pricesmonthlyoptions-callback)
    - [prices.direct(options, callback)](#pricesdirectoptions-callback)
    - [prices.calendar(options, callback)](#pricescalendaroptions-callback)
    - [prices.holidaysByRoutes(options, callback)](#pricesholidaysbyroutesoptions-callback)
    - [minPricesCalendar(options, callback)](#minpricescalendaroptions-callback)
    - [specialOffers(callback)](#specialofferscallback)
  - [Flight Search](#flight-search)
    - [flight.search(params, callback)](#flightsearchparams-callback)
    - [flight.results(params, callback)](#flightresultsparams-callback)
    - [flight.click(params, callback)](#flightclickparams-callback)
  - [Affiliate statistics](#affiliate-statistics)
    - [statistics.balance(callback)](#statisticsbalancecallback)
    - [statistics.payments(callback)](#statisticspaymentscallback)
    - [statistics.sales(options, callback)](#statisticssalesoptions-callback)
    - [statistics.detailedSales(options, callback)](#statisticsdetailedsalesoptions-callback)
  - [Price map](#price-map)
    - [map.directions(options, callback)](#mapdirectionsoptions-callback)
    - [map.prices(options, callback)](#mappricesoptions-callback)
  - [Directions](#directions)
    - [directions.airline(options, callback)](#directionsairlineoptions-callback)
    - [directions.city(options, callback)](#directionscityoptions-callback)
  - [Misc](#misc)
    - [whereami(options, callback)](#whereamioptions-callback)
    - [currency(callback)](#currencycallback)
- [Example](#example)
- [Tests](#tests)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Install

```
npm i travelpayouts
```

# Use

1. Sign up for [Travelpayouts](https://www.travelpayouts.com/?marker=99684&locale=en).
2. Obtain an API token in the section [Developers → API](https://www.travelpayouts.com/developers/api).
3. Include the library in your code and pass the token:

```js
var travelpayoutsAPI = require('travelpayouts');
var tapi = travelpayoutsAPI({ token: 'your_token' });
```

You can now use API methods.

# API

## travelpayoutsAPI([options])

Returns API object, accepts the following params:

* `token` — an API token. Required if you are going to use restricted APIs.

* `marker` — your unique affiliate identifier. Required for Flight Search API.

* `host` — your website host or app name. Required for Flight Search API.

* `requestOptions` — [request](https://github.com/request/request) options, which will be used by default. Use it to specify a proxy, timeout, etc.

## All methods

All methods accept an object with params as the first argument. All methods accept callback, that will be called with results of request. The first argument to callback will be an error or `null` if no errors occured.

For each method listed below there is a link to the relevant section of the official documentation.

**Please note**, that API token, marker, and host always passed to the API automatically, and you don't have to specify it for each request manually.

## Prices

Allows to access various cache data from flight searches.

> Attention, the data is transferred from the cache, so it is recommended to use it to generate static pages.

### prices.latest(options, callback)

[Prices for the latest 48 hours](http://api.travelpayouts.com/#v2_prices_latest_endpoint)

### prices.monthMatrix(options, callback)

[Prices for each day of the month, grouped by number of stops](http://api.travelpayouts.com/#v2_prices_month-matrix_endpoint)

### prices.weekMatrix(options, callback)

[Price calendar on week](http://api.travelpayouts.com/#v2_prices_week-matrix_endpoint)

### prices.nearestPlacesMatrix(options, callback)

[Prices for alternative routes](http://api.travelpayouts.com/#v2_prices_nearest-places-matrix_endpoint)

### prices.cheap(options, callback)

[Cheapest tickets](https://support.travelpayouts.com/hc/en-us/articles/203956163#01)

### prices.monthly(options, callback)

[Cheapest tickets grouped by month](http://api.travelpayouts.com/#v1_prices_monthly_endpoint)

### prices.direct(options, callback)

[Non-stop tickets](https://support.travelpayouts.com/hc/en-us/articles/203956163#02)

### prices.calendar(options, callback)

[Tickets for each day of month](https://support.travelpayouts.com/hc/en-us/articles/203956163#03)

### prices.holidaysByRoutes(options, callback)

[Cheap flights for holidays](http://api.travelpayouts.com/#v2_prices_holidays-by-routes_endpoint)

### minPricesCalendar(options, callback)

[Price calendar](https://support.travelpayouts.com/hc/en-us/articles/203972143-Price-calendar-API)

### specialOffers(callback)

[Special offers](http://api.travelpayouts.com/#v2_prices_special-offers_endpoint)

The API returns an XML, however the module returns a ready to use JS object.

## Flight Search

[Requirements for API access](https://support.travelpayouts.com/hc/en-us/articles/210995808-Requirements-for-API-access)

**Please note**, that md5 signature is generated automatically by this module, so you don't need to do it in your code.

### flight.search(params, callback)

[Request initialization](https://support.travelpayouts.com/hc/en-us/articles/203956173-Flights-search-API-Real-time-and-multi-city-search#u2)

### flight.results(params, callback)

[Getting search results](https://support.travelpayouts.com/hc/en-us/articles/203956173-Flights-search-API-Real-time-and-multi-city-search#u2)

### flight.click(params, callback)

[Getting a link to the agency website](https://support.travelpayouts.com/hc/en-us/articles/203956173-Flights-search-API-Real-time-and-multi-city-search#05)

## Affiliate statistics

### statistics.balance(callback)

[Balance](http://api.travelpayouts.com/#v2_statistics_balance_endpoint)

### statistics.payments(callback)

[Your payments](http://api.travelpayouts.com/#v2_statistics_payments_endpoint)

### statistics.sales(options, callback)

[Your stats](http://api.travelpayouts.com/#v2_statistics_sales_endpoint)

### statistics.detailedSales(options, callback)

[Your stats by date and marker](http://api.travelpayouts.com/#v2_statistics_detailed-sales_endpoint)

## Price map

### map.directions(options, callback)

[Supported routes](https://support.travelpayouts.com/hc/en-us/articles/203755406-Price-Map-API)

### map.prices(options, callback)

[Prices](https://support.travelpayouts.com/hc/en-us/articles/203755406-Price-Map-API)

## Directions

### directions.airline(options, callback)

[Popular airline routes](https://support.travelpayouts.com/hc/en-us/articles/203956163#04)

### directions.city(options, callback)

[Popular routes from city](http://api.travelpayouts.com/#v1_city-directions_endpoint)

## Misc

### whereami(options, callback)

[User location by IP address](https://support.travelpayouts.com/hc/en-us/articles/203956163#06)

You don't need to specify `callback` param in options since the module does this automatically.

### currency(callback)

[Currency exchange rate related to Russian Ruble](https://support.travelpayouts.com/hc/ru/articles/203956163#17) (in Russian)

# Example

```js
var travelpayoutsAPI = require('travelpayouts');
var tapi = travelpayoutsAPI({ token: 'your_token' });

tapi.prices.latest({
    currency: 'rub',
    period_type: 'year',
    page: 1,
    limit: 30,
    show_to_affiliates: true,
    sorting: 'price',
    trip_class: 0
}, function (err, result) {
    if (err) throw err;
    console.log(result);
});
```

# Tests

In order to run the tests clone the repo, run `npm install` inside it and run `npm test`. This runs the tests on a test data.

You can also run the tests against the actual API to test library compatibility. Use the command:

```
mocha --reporter=spec -t 10000 -s 10000 tests/test.api.js --token your_token
```

# License

The MIT License (MIT)

Copyright (c) 2016 Alexey Komarov <alex7kom@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
