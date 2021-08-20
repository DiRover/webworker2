import { fromEvent } from 'rxjs';
import Store from './Store';
import ListRender from './ListRender';
import handler from './handler';
import { hashAlgorithms } from './hashAlgorithms';
import workerOnload from './workerOnload';

console.log('code is working');

const algorithm = document.querySelector('.current');// контейнер для текущего типа алгоритма вычисления
const hash = document.querySelector('.hash');// контейтнер для текущего хэша файла

const fileElem = document.querySelector('[data-id="file"]');// поле инпута для файла
const overlap = document.querySelector('[data-id="overlap"]');// перекрыющий элемента для стилизации дропа файла
const store = new Store(hashAlgorithms);// класс для создания и управления потоками
const listRender = new ListRender(store, hash, algorithm);// класс для отрисовки элементов страницы
listRender.init();

// передаём клик с перекрывающего элемента на нижележащий инпут
overlap.addEventListener('click', () => {
  fileElem.dispatchEvent(new MouseEvent('click'));
});

fileElem.addEventListener('change', (e) => {
  const file = e.target.files[0];// получаем дропнутый или загруженный в поле инпут файл
  workerOnload({ file, store });// передаём его веб воркеру
});

overlap.addEventListener('dragover', (e) => {
  e.preventDefault();
});

overlap.addEventListener('drop', (e) => {
  e.preventDefault();
  console.log(e.dataTransfer.files[0]);
  const file = e.dataTransfer.files[0];// получаем дропнутый или загруженный в поле инпут файл
  workerOnload({ file, store });// передаём его веб воркеру
});

fromEvent(algorithm, 'click').subscribe((e) => { // обрабатваем все клики на странице технологией RxJS
  handler(e.target, store);// отработчик кликов
});
