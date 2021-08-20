"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = workerOnload;

require("core-js/modules/es.object.assign.js");

var _web = _interopRequireDefault(require("./web.worker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable func-names */
function workerOnload(_ref) {
  var args = Object.assign({}, _ref);
  var file = args.file,
      store = args.store; // получаем всё что нужно для начала вычисления

  if (window.Worker) {
    // проверяем наличие веб воркера в браузере
    var worker = new _web["default"](); // создаём инстанс воркера

    var reader = new FileReader(); // создаём ридар файлов

    reader.readAsArrayBuffer(file); // читаем файл из буфера

    reader.onload = function () {
      // обрабатываем результат чтения
      var buffer = reader.result; // записываем результат

      store.setFile(file); // записываем текущий файл

      worker.postMessage({
        buffer: buffer,
        algorithm: store.currerntAlgorithm
      }, [buffer]); // отправляем воркеру данные для вычисления

      worker.addEventListener('message', function (hash) {
        // получаем ответ от веб воркера
        store.setHash(hash); // устанавливаем текущий хэш

        worker.terminate(); // удаляем веб воркер
      });
    };
  } else {
    // сообщаем что браузер не поддерживает веб воркер
    console.log('Your browser doesn\'t support web workers.');
  }
}