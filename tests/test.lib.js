/* eslint max-len: "off" */
/* eslint no-magic-numbers: "off" */

var path = require('path');

var nock = require('nock');

global.token = 'test';

var reqheaders = {
  reqheaders: {
    'X-Access-Token': function (headerValue) {
      return headerValue === global.token;
    }
  }
};

var badheaders = {
  badheaders: ['X-Access-Token']
};

var pricesLatest = '/v2/prices/latest?currency=rub&period_type=year&page=1&limit=30&show_to_affiliates=true&sorting=price&trip_class=0';
nock('http://api.travelpayouts.com', reqheaders)
  .get(pricesLatest)
  .replyWithFile(200, path.join(__dirname, 'data/prices.latest.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(pricesLatest)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var pricesMonthMatrix = '/v2/prices/month-matrix?currency=rub&origin=LED&destination=HKT&show_to_affiliates=true';
nock('http://api.travelpayouts.com', reqheaders)
  .get(pricesMonthMatrix)
  .replyWithFile(200, path.join(__dirname, 'data/prices.month-matrix.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(pricesMonthMatrix)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var pricesWeekMatrix = '/v2/prices/week-matrix?currency=rub&origin=LED&destination=HKT&show_to_affiliates=true&depart_date=2016-09-04&return_date=2016-09-18';
nock('http://api.travelpayouts.com', reqheaders)
  .get(pricesWeekMatrix)
  .replyWithFile(200, path.join(__dirname, 'data/prices.week-matrix.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(pricesWeekMatrix)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var pricesNearestPlacesMatrix = '/v2/prices/nearest-places-matrix?currency=rub&origin=LED&destination=HKT&show_to_affiliates=true';
nock('http://api.travelpayouts.com', reqheaders)
  .get(pricesNearestPlacesMatrix)
  .replyWithFile(200, path.join(__dirname, 'data/prices.nearest-places-matrix.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(pricesNearestPlacesMatrix)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var pricesCheap = '/v1/prices/cheap?origin=MOW&destination=HKT&depart_date=2016-11&return_date=2016-12';
nock('http://api.travelpayouts.com', reqheaders)
  .get(pricesCheap)
  .replyWithFile(200, path.join(__dirname, 'data/prices.cheap.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(pricesCheap)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var pricesMonthly = '/v1/prices/monthly?currency=RUB&origin=MOW&destination=HKT';
nock('http://api.travelpayouts.com', reqheaders)
  .get(pricesMonthly)
  .replyWithFile(200, path.join(__dirname, 'data/prices.monthly.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(pricesMonthly)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var pricesDirect = '/v1/prices/direct?origin=MOW&destination=HKT&depart_date=2016-11&return_date=2016-12';
nock('http://api.travelpayouts.com', reqheaders)
  .get(pricesDirect)
  .replyWithFile(200, path.join(__dirname, 'data/prices.cheap.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(pricesDirect)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var pricesCalendar = '/v1/prices/calendar?depart_date=2016-11&origin=MOW&destination=BCN&calendar_type=departure_date';
nock('http://api.travelpayouts.com', reqheaders)
  .get(pricesCalendar)
  .replyWithFile(200, path.join(__dirname, 'data/prices.calendar.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(pricesCalendar)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var pricesHolidaysByRoutes = '/v2/prices/holidays-by-routes';
nock('http://api.travelpayouts.com', reqheaders)
  .get(pricesHolidaysByRoutes)
  .replyWithFile(200, path.join(__dirname, 'data/prices.holidays-by-routes.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(pricesHolidaysByRoutes)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var statisticsBalance = '/v2/statistics/balance';
nock('http://api.travelpayouts.com', reqheaders)
  .get(statisticsBalance)
  .replyWithFile(200, path.join(__dirname, 'data/statistics.balance.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(statisticsBalance)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var statisticsPayments = '/v2/statistics/payments';
nock('http://api.travelpayouts.com', reqheaders)
  .get(statisticsPayments)
  .replyWithFile(200, path.join(__dirname, 'data/statistics.payments.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(statisticsPayments)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var statisticsSales = '/v2/statistics/sales?group_by=date&month=2015-05-14&host_filter=null&marker_filter=null';
nock('http://api.travelpayouts.com', reqheaders)
  .get(statisticsSales)
  .replyWithFile(200, path.join(__dirname, 'data/statistics.sales.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(statisticsSales)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var statisticsDetailedSales = '/v2/statistics/detailed-sales?group_by=date_marker&month=2015-05-14&host_filter=null&marker_filter=null';
nock('http://api.travelpayouts.com', reqheaders)
  .get(statisticsDetailedSales)
  .replyWithFile(200, path.join(__dirname, 'data/statistics.detailed-sales.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(statisticsDetailedSales)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var mapDirections = '/supported_directions.json?origin_iata=LED&one_way=false&locale=ru';
nock('http://map.aviasales.ru')
  .get(mapDirections)
  .replyWithFile(200, path.join(__dirname, 'data/map.directions.json'));

var mapPrices = '/prices.json?origin_iata=LED&period=2014-12-01%3Aseason&direct=true&one_way=false&price=50000&no_visa=true&schengen=true&need_visa=true&locale=ru&min_trip_duration_in_days=13&max_trip_duration_in_days=15';
nock('http://map.aviasales.ru')
  .get(mapPrices)
  .replyWithFile(200, path.join(__dirname, 'data/map.prices.json'));

var directionsAirline = '/v1/airline-directions?airline_code=SU&limit=10';
nock('http://api.travelpayouts.com', reqheaders)
  .get(directionsAirline)
  .replyWithFile(200, path.join(__dirname, 'data/airline-directions.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(directionsAirline)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var directionsCity = '/v1/city-directions?origin=MOW&currency=usd';
nock('http://api.travelpayouts.com', reqheaders)
  .get(directionsCity)
  .replyWithFile(200, path.join(__dirname, 'data/city-directions.json'));
nock('http://api.travelpayouts.com', badheaders)
  .get(directionsCity)
  .replyWithFile(401, path.join(__dirname, 'data/unauthorized.json'));

var minPricesCalendar = '/calendar_preload?origin=MOW&destination=LED&depart_date=2016-05-30&one_way=false';
nock('http://min-prices.aviasales.ru')
  .get(minPricesCalendar)
  .replyWithFile(200, path.join(__dirname, 'data/min-prices.json'));

var specialOffers = '/v2/prices/special-offers';
nock('http://api.travelpayouts.com')
  .get(specialOffers)
  .replyWithFile(200, path.join(__dirname, 'data/special-offers.xml'));

var whereami = '/whereami?callback=cb&locale=ru&ip=62.105.128.0';
nock('http://www.travelpayouts.com')
  .get(whereami)
  .replyWithFile(200, path.join(__dirname, 'data/whereami.json'));

var currency = '/adaptors/currency.json';
nock('http://yasen.aviasales.ru')
  .get(currency)
  .replyWithFile(200, path.join(__dirname, 'data/currency.json'));

require('./test.api.js');
