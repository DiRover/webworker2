export default class ListRender {// класс для списка задач
  constructor(store, hashBox, container) {
    this.store = store;// экземпляр класса Store
    this.container = container;// корневой элемент для отображения
    this.hashBox = hashBox;// коробка для содержания вычесленного хэша
  }

  init() { // метод для отрисовки
    this.store.state$.subscribe((info) => { // получаем объект с вычесленным хэшом и алгоритмом расчёта
      this.render(info);
      this.renderHash(info);
    });// подписываемся на поток и рендерим
  }

  render(info) { // метод для рендера текущего алгоритма расчёта
    // console.log(info);
    const { currerntAlgorithm } = info;
    const elem = document.createElement('div');// создаём элемент-контейнер
    elem.setAttribute('class', 'current-algorithm');
    elem.innerHTML = `${currerntAlgorithm}`;
    this.container.innerHTML = '';
    this.container.append(elem);
    this.renderStateList(info);
  }

  renderStateList(info) {
    const { algorithms } = info;// получаем алгоритмы расчета
    const elemCon = document.createElement('div');// создаём элемент-контейнер
    elemCon.setAttribute('class', 'algorithms-list hidden');// прописываем ему классы стилей
    algorithms.forEach((item) => { // обрабатываем массив с алгоритмов расчёта
      const elem = document.createElement('div');// создаём элемент для хранения названия алгоритма расчёта
      elem.setAttribute('class', 'algorithm');// прописываем ему классы стилей
      elem.innerHTML = `${item}`;// прописываем название
      elemCon.append(elem);// приклеиваем к элементу-контейнеру
    });
    this.container.append(elemCon);// приклеиваем к корневому элементу
  }

  renderHash(info) { // метод для рендера хеша
    const { hash } = info;
    this.hashBox.innerHTML = hash || 'Check hash!';
  }
}
