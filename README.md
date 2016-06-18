# Travelpayouts (Aviasales/JetRadar) API для Node.js

[![Build Status](https://travis-ci.org/Alex7Kom/node-travelpayouts.svg?branch=master)](https://travis-ci.org/Alex7Kom/node-travelpayouts)
[![David](https://david-dm.org/Alex7Kom/node-travelpayouts.svg)](https://david-dm.org/Alex7Kom/node-travelpayouts)

[In English](README-en.md)

(Минималистичная) обертка для API Travelpayouts (Aviasales/JetRadar).

Поддерживаются следующие API:

* данных

* поиска авиабилетов

* партнерской статистики

**См. также:** модуль для работы с файлами данных Travelpayouts — [travelpayouts-data](https://github.com/Alex7Kom/node-travelpayouts-data).

**Содержание**
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Установка](#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0)
- [Использование](#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
- [API](#api)
  - [travelpayoutsAPI([options])](#travelpayoutsapioptions)
  - [Все методы](#%D0%B2%D1%81%D0%B5-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D1%8B)
  - [Цены](#%D1%86%D0%B5%D0%BD%D1%8B)
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
  - [Поиск авиабилетов](#%D0%BF%D0%BE%D0%B8%D1%81%D0%BA-%D0%B0%D0%B2%D0%B8%D0%B0%D0%B1%D0%B8%D0%BB%D0%B5%D1%82%D0%BE%D0%B2)
    - [flight.search(params, callback)](#flightsearchparams-callback)
    - [flight.results(params, callback)](#flightresultsparams-callback)
    - [flight.click(params, callback)](#flightclickparams-callback)
  - [Партнерская статистика](#%D0%BF%D0%B0%D1%80%D1%82%D0%BD%D0%B5%D1%80%D1%81%D0%BA%D0%B0%D1%8F-%D1%81%D1%82%D0%B0%D1%82%D0%B8%D1%81%D1%82%D0%B8%D0%BA%D0%B0)
    - [statistics.balance(callback)](#statisticsbalancecallback)
    - [statistics.payments(callback)](#statisticspaymentscallback)
    - [statistics.sales(options, callback)](#statisticssalesoptions-callback)
    - [statistics.detailedSales(options, callback)](#statisticsdetailedsalesoptions-callback)
  - [Карта цен](#%D0%BA%D0%B0%D1%80%D1%82%D0%B0-%D1%86%D0%B5%D0%BD)
    - [map.directions(options, callback)](#mapdirectionsoptions-callback)
    - [map.prices(options, callback)](#mappricesoptions-callback)
  - [Направления](#%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F)
    - [directions.airline(options, callback)](#directionsairlineoptions-callback)
    - [directions.city(options, callback)](#directionscityoptions-callback)
  - [Разное](#%D1%80%D0%B0%D0%B7%D0%BD%D0%BE%D0%B5)
    - [whereami(options, callback)](#whereamioptions-callback)
    - [currency(callback)](#currencycallback)
- [Пример](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80)
- [Тесты](#%D1%82%D0%B5%D1%81%D1%82%D1%8B)
- [Лицензия](#%D0%BB%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Установка

```
npm i travelpayouts
```

# Использование

1. Зарегистрируйтесь на [Travelpayouts](https://www.travelpayouts.com/?marker=99684&locale=ru).
2. В разделе [Разработчикам → API](https://www.travelpayouts.com/developers/api) получите API токен.
3. В своем коде подключите библиотеку и передайте ей токен следующим образом:

```js
var travelpayoutsAPI = require('travelpayouts');
var tapi = travelpayoutsAPI({ token: 'ваш_токен' });
```

Теперь вы можете использовать методы API.

# API

## travelpayoutsAPI([options])

Функция, возвращающая объект API, принимает объект со следующими параметрами:

* `token` — API токен, обязательный параметр, если вы собираетесь работать с API, закрытыми токеном.

* `marker` — партнерский маркер, обязательный параметр, если вы собираетесь работать с API поиска авиабилетов.

* `host` — название вашего сайта или приложения, обязательный параметр, если вы собираетесь работать с API поиска авиабилетов.

* `requestOptions` — опции модуля [request](https://github.com/request/request), которые будут использованы по умолчанию. Используйте, если хотите поменять таймаут по умолчанию, использовать прокси и т.д.

## Все методы

Все параметры запроса, если необходимы, передаются внутри объекта, идущего первым аргументом. Все методы принимают в качестве одного из аргументов `callback`, который будет вызван с результатами выполнения запроса. Первым аргументом в `callback` всегда передается ошибка или `null`, если ошибок не было.

Для каждого метода ниже дается ссылка на релевантную часть официальной документации.

**Обратите внимание**, что токен, маркер и хост всегда, где необходимо, передаются автоматически и вам это делать не нужно!

## Цены

Позволяет получать разнообразные данные из кэша поиска авиабилетов.

> Обратите внимание, все данные передаются из кэша, поэтому их следует использовать для формирования статичных страниц, на которых актуальность информации не критична.

### prices.latest(options, callback)

[Цены на авиабилеты за 48 часов](https://support.travelpayouts.com/hc/ru/articles/203956163#02)

### prices.monthMatrix(options, callback)

[Календарь цен на месяц](https://support.travelpayouts.com/hc/ru/articles/203956163#03)

### prices.weekMatrix(options, callback)

[Календарь цен на неделю](https://support.travelpayouts.com/hc/ru/articles/203956163#19)

### prices.nearestPlacesMatrix(options, callback)

[Цены по альтернативным направлениям](https://support.travelpayouts.com/hc/ru/articles/203956163#04)

### prices.cheap(options, callback)

[Самые дешевые авиабилеты](https://support.travelpayouts.com/hc/ru/articles/203956163#05)

### prices.monthly(options, callback)

[Самые дешевые авиабилеты по месяцам](http://api.travelpayouts.com/#v1_prices_monthly_endpoint)

### prices.direct(options, callback)

[Билеты без пересадок](https://support.travelpayouts.com/hc/ru/articles/203956163#06)

### prices.calendar(options, callback)

[Билеты из города на любое число месяца](https://support.travelpayouts.com/hc/ru/articles/203956163#07)

### prices.holidaysByRoutes(options, callback)

[Самые дешевые билеты на выходные](http://api.travelpayouts.com/#v2_prices_holidays-by-routes_endpoint)

### minPricesCalendar(options, callback)

[Календарь цен](https://support.travelpayouts.com/hc/ru/articles/203972143-API-%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D1%8F-%D1%86%D0%B5%D0%BD)

### specialOffers(callback)

[Специальные предложения](https://support.travelpayouts.com/hc/ru/articles/203956163#18)

Несмотря на то, что API возвращает XML, на выходе модуля вы получаете уже готовый JS-объект.

## Поиск авиабилетов

[Условия предоставления доступа к API поиска билетов](https://support.travelpayouts.com/hc/ru/articles/210995808-%D0%A3%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F-%D0%BF%D1%80%D0%B5%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0-%D0%BA-API-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%B0-%D0%B1%D0%B8%D0%BB%D0%B5%D1%82%D0%BE%D0%B2)

**Обратите внимание**, что подпись (md5 signature) формируется модулем автоматически на основе переданных параметров, и вам это делать не нужно.

### flight.search(params, callback)

[Инициализация поиска](https://support.travelpayouts.com/hc/ru/articles/203956173-API-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%B0-%D0%B0%D0%B2%D0%B8%D0%B0%D0%B1%D0%B8%D0%BB%D0%B5%D1%82%D0%BE%D0%B2-%D1%81%D0%BB%D0%BE%D0%B6%D0%BD%D1%8B%D0%B5-%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D1%8B-%D0%B8-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA-%D0%B2-%D1%80%D0%B5%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC-%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%B8#01)

### flight.results(params, callback)

[Получение результатов поиска](https://support.travelpayouts.com/hc/ru/articles/203956173-API-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%B0-%D0%B0%D0%B2%D0%B8%D0%B0%D0%B1%D0%B8%D0%BB%D0%B5%D1%82%D0%BE%D0%B2-%D1%81%D0%BB%D0%BE%D0%B6%D0%BD%D1%8B%D0%B5-%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D1%8B-%D0%B8-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA-%D0%B2-%D1%80%D0%B5%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC-%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%B8#01)

### flight.click(params, callback)

[Получение ссылки для перехода на сайт агентства](https://support.travelpayouts.com/hc/ru/articles/203956173-API-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%B0-%D0%B0%D0%B2%D0%B8%D0%B0%D0%B1%D0%B8%D0%BB%D0%B5%D1%82%D0%BE%D0%B2-%D1%81%D0%BB%D0%BE%D0%B6%D0%BD%D1%8B%D0%B5-%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D1%8B-%D0%B8-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA-%D0%B2-%D1%80%D0%B5%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC-%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%B8#05)

## Партнерская статистика

### statistics.balance(callback)

[Баланс](https://support.travelpayouts.com/hc/ru/articles/206111067)

### statistics.payments(callback)

[Выплаты партнерского вознаграждения](https://support.travelpayouts.com/hc/ru/articles/206111067)

### statistics.sales(options, callback)

[Данные по переходам и покупкам](https://support.travelpayouts.com/hc/ru/articles/206111067)

### statistics.detailedSales(options, callback)

[Данные по дате и доп. маркеру](https://support.travelpayouts.com/hc/ru/articles/206111067)

## Карта цен

### map.directions(options, callback)

[Поддерживаемые направления](https://support.travelpayouts.com/hc/ru/articles/203755406-API-%D0%BA%D0%B0%D1%80%D1%82%D1%8B-%D1%86%D0%B5%D0%BD)

### map.prices(options, callback)

[Цены](https://support.travelpayouts.com/hc/ru/articles/203755406-API-%D0%BA%D0%B0%D1%80%D1%82%D1%8B-%D1%86%D0%B5%D0%BD)

## Направления

### directions.airline(options, callback)

[Популярные направления авиакомпании](https://support.travelpayouts.com/hc/ru/articles/203956163#08)

### directions.city(options, callback)

[Популярные направления из города](https://support.travelpayouts.com/hc/ru/articles/203956163#20)

## Разное

### whereami(options, callback)

[Определение местоположения пользователя по IP-адресу](https://support.travelpayouts.com/hc/ru/articles/203956163#16)

Указывать `callback` среди других параметров не нужно, так как это делает модуль автоматически.

### currency(callback)

[Текущий курс популярных валют к рублю](https://support.travelpayouts.com/hc/ru/articles/203956163#17)

# Пример

```js
var travelpayoutsAPI = require('travelpayouts');
var tapi = travelpayoutsAPI({ token: 'ваш_токен' });

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

# Тесты

Для запуска тестов нужно склонировать данный репозиторий, выполнить `npm install` и запустить `npm test`. Будет выполнен тест модуля на тестовых данных.

Чтобы запустить тест против настоящего API, например, для проверки совместимости модуля с текущим API, используйте команду

```
mocha --reporter=spec -t 10000 -s 10000 tests/test.api.js --token ваш_токен
```

# Лицензия

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
