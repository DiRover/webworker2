/* eslint-disable func-names */
import Worker from './web.worker';

export default function workerOnload({ ...args }) {
  const { file, store } = args;// получаем всё что нужно для начала вычисления
  if (window.Worker) { // проверяем наличие веб воркера в браузере
    const worker = new Worker();// создаём инстанс воркера
    const reader = new FileReader();// создаём ридар файлов
    reader.readAsArrayBuffer(file);// читаем файл из буфера
    reader.onload = function () { // обрабатываем результат чтения
      const buffer = reader.result;// записываем результат
      store.setFile(file);// записываем текущий файл
      worker.postMessage({ buffer, algorithm: store.currerntAlgorithm }, [buffer]);// отправляем воркеру данные для вычисления
      worker.addEventListener('message', (hash) => { // получаем ответ от веб воркера
        store.setHash(hash);// устанавливаем текущий хэш
        worker.terminate();// удаляем веб воркер
      });
    };
  } else { // сообщаем что браузер не поддерживает веб воркер
    console.log('Your browser doesn\'t support web workers.');
  }
}
