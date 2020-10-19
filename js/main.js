"use strict";

const COMMENT_OPTIONS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];

const NAME = [
  `Монки`,
  `Зюзя`,
  `Иванушка`,
  `Кинза`,
  `Варфоломей`,
  `Хельга`,
  `Бьенсе`,
  `Митя`,
];

const PHOTOS_OBJECT_TOTAL = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_AVATAR = 6;
const MAX_COMMENTS = 6;

const similarPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const newPictures = document.querySelector(`.pictures`);

const getRandomNumber = (min, max) =>
  min + Math.floor(Math.random() * (max - min - 1));

// создаем основную функцию для массива с фотографиями пользователей

const photosArray = [];
const createMockObjects = () => {
  for (let i = 0; i < PHOTOS_OBJECT_TOTAL; i++) {
    photosArray[i] = {
      url: `photos/${i + 1}.jpg`,
      description: `описание фотографии`,
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: createComments(getRandomNumber(1, MAX_COMMENTS)),
    };
  }
  return photosArray;
};

// генерация массива комментария со случайными данными

const createComments = (commentsCount) => {
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments[i] = {
      avatar: `img/avatar-${getRandomNumber(1, MAX_AVATAR)}.svg`,
      message: COMMENT_OPTIONS[getRandomNumber(0, COMMENT_OPTIONS.length)],
      name: NAME[getRandomNumber(0, NAME.length)],
    };
  }
  return comments;
};

createMockObjects();

// заполнение блока DOM-элементами на основе массива JS-объектов

for (let i = 0; i < photosArray.length; i++) {
  const photosElement = similarPictureTemplate.cloneNode(true);

  photosElement.querySelector(`.picture__img`).src = photosArray[i].url;
  photosElement.querySelector(`.picture__comments`).textContent = photosArray[i].comments.length;
  photosElement.querySelector(`.picture__likes`).textContent = photosArray[i].likes;
  newPictures.appendChild(photosElement);
}

/* Покажите элемент .big-picture, удалив у него класс hidden и заполните его информацией из первого элемента массива с данными:

Адрес изображения url подставьте как src изображения внутри блока.big-picture__img. */

/* Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.

Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

<li class="social__comment">
    <img
        class="social__picture"
        src="{{аватар}}"
        alt="{{имя комментатора}}"
        width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
</li>
Описание фотографии description вставьте строкой в блок .social__caption.

Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden.

Добавьте на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. */


const bigPicture = document.querySelector(`.big-picture`);
bigPicture.classList.remove(`hidden`);

document.querySelector(`.big-picture__img`).src = photosArray[0].url;
document.querySelector(`.likes-count`).textContent = photosArray[0].likes;
document.querySelector(`.comments-count`).textContent = photosArray[0].comments.length;
document.querySelector(`.social__caption`).textContent = photosArray[0].description;

const parentComments = document.querySelector(`.social__comments`);
const socialComment = document.createElement(`li`);
socialComment.classList.add(`social__comment`);

parentComments.append(socialComment);

const socialPicture = document.createElement(`img`);
socialPicture.classList.add(`social__picture`);
socialComment.append(socialPicture);
socialPicture.setAttribute(`src`, `${photosArray[0].comments[0].avatar}`);
socialPicture.setAttribute(`alt`, `${photosArray[0].comments[0].name}`);
socialPicture.setAttribute(`width`, `35`);
socialPicture.setAttribute(`height`, `35`);

const socialText = document.createElement(`p`);
socialText.classList.add(`social__text`);
socialText.textContent = photosArray[0].comments[0].message; // а можно как-то оптимизировать указание индексов в массиве?
socialComment.append(socialText);

document.querySelector(`.social__comment-count`).classList.add(`hidden`);
document.querySelector(`.comments-loader`).classList.add(`hidden`);
document.querySelector(`body`).classList.add(`modal-open`);
// нужно ли для выше написанное выносить в функцию?

