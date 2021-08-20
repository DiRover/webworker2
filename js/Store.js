"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.define-property.js");

var _rxjs = require("rxjs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Store = /*#__PURE__*/function () {
  function Store(data) {
    _classCallCheck(this, Store);

    this.state$ = new _rxjs.BehaviorSubject(); // сабжект (обсёрвал) с возможностью задания начального значения

    this.data = data; // записваем общий список алгоритмов расчёта

    this.currerntAlgorithm = data[0]; // начальный, по умолчанию, алгоритм расчёта

    this.hash = 'Check hash!'; // начальное значение заглушка

    this.file = null; // загруженного файла пока нет

    this.state$.next({
      algorithms: this.data,
      currerntAlgorithm: this.currerntAlgorithm,
      hash: this.hash,
      file: this.file
    }); // эмитим (или задаём хз как там) первоначальный стейт
  }

  _createClass(Store, [{
    key: "selectAlgorithm",
    value: function selectAlgorithm(algorithm) {
      // метод для изменения выбранного алгоритма расчёта
      var newCurrentAlgorithm = this.data.filter(function (item) {
        // ищем по полученному из обработчика кликов названию
        if (item === algorithm) {
          // выбранный алгоритм расчёта в общем списке проектов и задач
          return item; // получаем его в виде массива с 1 объектом
        }
      });
      this.currerntAlgorithm = newCurrentAlgorithm[0]; // записываем найденный алгоритм расчёта в текущий алгоритм расчёта

      this.state$.next({
        algorithms: this.data,
        currerntAlgorithm: this.currerntAlgorithm
      }); // эмитим (или задаём хз как там) новый стейт
    } // после этого стейт в store изменился, запускается метод init() у экземпляров классов рендеров, и далее подписка на поток, в котором запускается функция рендер

  }, {
    key: "setFile",
    value: function setFile(file) {
      this.file = file;
      this.state$.next({
        algorithms: this.data,
        currerntAlgorithm: this.currerntAlgorithm,
        hash: this.hash,
        file: this.file // появился файл!

      }); // эмитим (или задаём хз как там) новый стейт
    }
  }, {
    key: "setHash",
    value: function setHash(hash) {
      // получили хэш!
      this.hash = hash.data;
      this.state$.next({
        algorithms: this.data,
        currerntAlgorithm: this.currerntAlgorithm,
        hash: this.hash
      }); // эмитим (или задаём хз как там) новый стейт
    } // эмитим новый поток

  }]);

  return Store;
}();

exports["default"] = Store;