"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handler;

var _workerOnload = _interopRequireDefault(require("./workerOnload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function handler(target, store) {
  // обработчик кликов получает цель клика и экземпляр класс Store
  var algorithm = target.textContent;
  var algorithmsList = document.querySelector('.algorithms-list'); // поп ап со списком алгоритмов вычисления хэша

  if (target.classList.contains('current-algorithm')) {
    algorithmsList.classList.remove('hidden');
    target.classList.add('hidden');
  } else if (algorithm === store.currerntAlgorithm) {
    algorithmsList.classList.add('hidden');
    var currerntAlgorithm = document.querySelector('.current-algorithm');
    currerntAlgorithm.classList.remove('hidden');
  } else {
    store.selectAlgorithm(algorithm);

    if (store.file) {
      var file = store.file;
      (0, _workerOnload["default"])({
        file: file,
        store: store
      });
    }

    algorithmsList.classList.add('hidden');

    var _currerntAlgorithm = document.querySelector('.current-algorithm');

    _currerntAlgorithm.classList.remove('hidden');
  }
}