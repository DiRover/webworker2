import workerOnload from './workerOnload';

export default function handler(target, store) { // обработчик кликов получает цель клика и экземпляр класс Store
  const algorithm = target.textContent;
  const algorithmsList = document.querySelector('.algorithms-list');// поп ап со списком алгоритмов вычисления хэша
  if (target.classList.contains('current-algorithm')) {
    algorithmsList.classList.remove('hidden');
    target.classList.add('hidden');
  } else if (algorithm === store.currerntAlgorithm) {
    algorithmsList.classList.add('hidden');
    const currerntAlgorithm = document.querySelector('.current-algorithm');
    currerntAlgorithm.classList.remove('hidden');
  } else {
    store.selectAlgorithm(algorithm);
    if (store.file) {
      const { file } = store;
      workerOnload({ file, store });
    }
    algorithmsList.classList.add('hidden');
    const currerntAlgorithm = document.querySelector('.current-algorithm');
    currerntAlgorithm.classList.remove('hidden');
  }
}
