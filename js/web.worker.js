"use strict";

require("core-js/modules/es.date.to-string.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

var _sha = _interopRequireDefault(require("crypto-js/sha1"));

var _sha2 = _interopRequireDefault(require("crypto-js/sha256"));

var _sha3 = _interopRequireDefault(require("crypto-js/sha512"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-restricted-globals */
// библиотеки для вычисления хэша
// это паралельный поток для выполнения трудоёмких вычислений
self.addEventListener('message', function (data) {
  // обрабатываем полученное сообщение от клиента
  var _data$data = data.data,
      buffer = _data$data.buffer,
      algorithm = _data$data.algorithm; // получаем файл в виде эрэй бухера и тип алгоритма расчёта

  var wordArray = _cryptoJs["default"].lib.WordArray.create(buffer); // это работа библиотек


  var hash;

  if (algorithm === 'MD5') {
    hash = _cryptoJs["default"].MD5(wordArray).toString(_cryptoJs["default"].enc.Hex);
  } else if (algorithm === 'SHA1') {
    hash = (0, _sha["default"])(wordArray).toString(_cryptoJs["default"].enc.Hex);
  } else if (algorithm === 'SHA256') {
    hash = (0, _sha2["default"])(wordArray).toString(_cryptoJs["default"].enc.Hex);
  } else if (algorithm === 'SHA512') {
    hash = (0, _sha3["default"])(wordArray).toString(_cryptoJs["default"].enc.Hex);
  }

  self.postMessage(hash); // отправляем вычисленный хэш пользвателю
});