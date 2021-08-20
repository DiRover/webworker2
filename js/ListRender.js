"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.define-property.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ListRender = /*#__PURE__*/function () {
  // класс для списка задач
  function ListRender(store, hashBox, container) {
    _classCallCheck(this, ListRender);

    this.store = store; // экземпляр класса Store

    this.container = container; // корневой элемент для отображения

    this.hashBox = hashBox; // коробка для содержания вычесленного хэша
  }

  _createClass(ListRender, [{
    key: "init",
    value: function init() {
      var _this = this;

      // метод для отрисовки
      this.store.state$.subscribe(function (info) {
        // получаем объект с вычесленным хэшом и алгоритмом расчёта
        _this.render(info);

        _this.renderHash(info);
      }); // подписываемся на поток и рендерим
    }
  }, {
    key: "render",
    value: function render(info) {
      // метод для рендера текущего алгоритма расчёта
      // console.log(info);
      var currerntAlgorithm = info.currerntAlgorithm;
      var elem = document.createElement('div'); // создаём элемент-контейнер

      elem.setAttribute('class', 'current-algorithm');
      elem.innerHTML = "".concat(currerntAlgorithm);
      this.container.innerHTML = '';
      this.container.append(elem);
      this.renderStateList(info);
    }
  }, {
    key: "renderStateList",
    value: function renderStateList(info) {
      var algorithms = info.algorithms; // получаем алгоритмы расчета

      var elemCon = document.createElement('div'); // создаём элемент-контейнер

      elemCon.setAttribute('class', 'algorithms-list hidden'); // прописываем ему классы стилей

      algorithms.forEach(function (item) {
        // обрабатываем массив с алгоритмов расчёта
        var elem = document.createElement('div'); // создаём элемент для хранения названия алгоритма расчёта

        elem.setAttribute('class', 'algorithm'); // прописываем ему классы стилей

        elem.innerHTML = "".concat(item); // прописываем название

        elemCon.append(elem); // приклеиваем к элементу-контейнеру
      });
      this.container.append(elemCon); // приклеиваем к корневому элементу
    }
  }, {
    key: "renderHash",
    value: function renderHash(info) {
      // метод для рендера хеша
      var hash = info.hash;
      this.hashBox.innerHTML = hash || 'Check hash!';
    }
  }]);

  return ListRender;
}();

exports["default"] = ListRender;