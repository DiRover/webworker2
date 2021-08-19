/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
import { BehaviorSubject } from 'rxjs';

export default class Store {
  constructor(data) {
    this.state$ = new BehaviorSubject();// сабжект (обсёрвал) с возможностью задания начального значения
    this.data = data;// записваем общий список алгоритмов расчёта
    this.currerntAlgorithm = data[0];// начальный, по умолчанию, алгоритм расчёта
    this.hash = 'Check hash!';// начальное значение заглушка
    this.file = null;// загруженного файла пока нет
    this.state$.next({
      algorithms: this.data,
      currerntAlgorithm: this.currerntAlgorithm,
      hash: this.hash,
      file: this.file,
    });// эмитим (или задаём хз как там) первоначальный стейт
  }

  selectAlgorithm(algorithm) { // метод для изменения выбранного алгоритма расчёта
    const newCurrentAlgorithm = this.data.filter((item) => { // ищем по полученному из обработчика кликов названию
      if (item === algorithm) { // выбранный алгоритм расчёта в общем списке проектов и задач
        return item; // получаем его в виде массива с 1 объектом
      }
    });
    this.currerntAlgorithm = newCurrentAlgorithm[0];// записываем найденный алгоритм расчёта в текущий алгоритм расчёта
    this.state$.next({ algorithms: this.data, currerntAlgorithm: this.currerntAlgorithm });// эмитим (или задаём хз как там) новый стейт
  }// после этого стейт в store изменился, запускается метод init() у экземпляров классов рендеров, и далее подписка на поток, в котором запускается функция рендер

  setFile(file) {
    this.file = file;
    this.state$.next({
      algorithms: this.data,
      currerntAlgorithm: this.currerntAlgorithm,
      hash: this.hash,
      file: this.file, // появился файл!
    });// эмитим (или задаём хз как там) новый стейт
  }

  setHash(hash) { // получили хэш!
    this.hash = hash.data;
    this.state$.next({ algorithms: this.data, currerntAlgorithm: this.currerntAlgorithm, hash: this.hash });// эмитим (или задаём хз как там) новый стейт
  }// эмитим новый поток
}
