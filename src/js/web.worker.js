/* eslint-disable no-restricted-globals */
import sha1 from 'crypto-js/sha1';// библиотеки для вычисления хэша
import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512';
import crypto from 'crypto-js';
// это паралельный поток для выполнения трудоёмких вычислений
self.addEventListener('message', (data) => { // обрабатываем полученное сообщение от клиента
  const { buffer, algorithm } = data.data;// получаем файл в виде эрэй бухера и тип алгоритма расчёта
  const wordArray = crypto.lib.WordArray.create(buffer);// это работа библиотек
  let hash;
  if (algorithm === 'MD5') {
    hash = crypto.MD5(wordArray).toString(crypto.enc.Hex);
  } else if (algorithm === 'SHA1') {
    hash = sha1(wordArray).toString(crypto.enc.Hex);
  } else if (algorithm === 'SHA256') {
    hash = sha256(wordArray).toString(crypto.enc.Hex);
  } else if (algorithm === 'SHA512') {
    hash = sha512(wordArray).toString(crypto.enc.Hex);
  }
  self.postMessage(hash);// отправляем вычисленный хэш пользвателю
});
