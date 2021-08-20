"use strict";

var _rxjs = require("rxjs");

var _Store = _interopRequireDefault(require("./Store"));

var _ListRender = _interopRequireDefault(require("./ListRender"));

var _handler = _interopRequireDefault(require("./handler"));

var _hashAlgorithms = require("./hashAlgorithms");

var _workerOnload = _interopRequireDefault(require("./workerOnload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log('code is working');
var algorithm = document.querySelector('.current'); // контейнер для текущего типа алгоритма вычисления

var hash = document.querySelector('.hash'); // контейтнер для текущего хэша файла

var fileElem = document.querySelector('[data-id="file"]'); // поле инпута для файла

var overlap = document.querySelector('[data-id="overlap"]'); // перекрыющий элемента для стилизации дропа файла

var store = new _Store["default"](_hashAlgorithms.hashAlgorithms); // класс для создания и управления потоками

var listRender = new _ListRender["default"](store, hash, algorithm); // класс для отрисовки элементов страницы

listRender.init(); // передаём клик с перекрывающего элемента на нижележащий инпут

overlap.addEventListener('click', function () {
  fileElem.dispatchEvent(new MouseEvent('click'));
});
fileElem.addEventListener('change', function (e) {
  var file = e.target.files[0]; // получаем дропнутый или загруженный в поле инпут файл

  (0, _workerOnload["default"])({
    file: file,
    store: store
  }); // передаём его веб воркеру
});
overlap.addEventListener('dragover', function (e) {
  e.preventDefault();
});
overlap.addEventListener('drop', function (e) {
  e.preventDefault();
  console.log(e.dataTransfer.files[0]);
  var file = e.dataTransfer.files[0]; // получаем дропнутый или загруженный в поле инпут файл

  (0, _workerOnload["default"])({
    file: file,
    store: store
  }); // передаём его веб воркеру
});
(0, _rxjs.fromEvent)(algorithm, 'click').subscribe(function (e) {
  // обрабатваем все клики на странице технологией RxJS
  (0, _handler["default"])(e.target, store); // отработчик кликов
});