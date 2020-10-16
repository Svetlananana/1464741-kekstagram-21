'use strict';

const randomUserPhoto = document.querySelector(`.picture__img`);
const pictureComments = document.querySelector(`.picture__comments`);
const pictureLikes = document.querySelector(`.picture__likes`);
const similarPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`); // не до конца понимаю этот код

const COMMENT_OPTIONS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];

const PHOTOS_OBJECT_TOTAL = 25;

const getRandomNumber = (min, max) => min + Math.floor(Math.random() * (max - min - 1));

const createMockObjects = function () {
  return {
    url: `photos/${getRandomNumber(1, 25)}.jpg`,
    description: `описание фотографии`,
    likes: getRandomNumber(15, 200),
     comments {
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: getRandomNumber,
      name: `Артем`,
    };
  };
};


const photosObject = [];

for (let i = 0; i < PHOTOS_OBJECT_TOTAL; i++) {
  wizards[i] = createMockObjects();
}

for (let i = 0; i < photosObject .length; i++) {
  const photosElement = similarPictureTemplate.cloneNode(true);

  photosElement.querySelector(`.picture__img`).setAttribute(`src`, comments.avatar);
  photosElement.querySelector(`.picture__comments`).textContent = photosObject[i].description;
  photosElement.querySelector(`.picture__likes`).textContent = photosObject[i].likes;
  similarListElement.appendChild(photosElement);
}
// я не понимаю, почему комментарий это отдельный объект и какие конкретно данные в нем должны храниться кроме комментариев?

/*
Напишите функцию для создания массива из 25 сгенерированных JS объектов. Каждый объект массива ‐ описание фотографии, опубликованной пользователем.
 Поля объекта:
url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25. Адреса картинок не должны повторяться.

description, строка — описание фотографии.

likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200

comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом.

Пример описания объекта с комментарием:

{
    avatar: "img/avatar-6.svg",
    message: "В целом всё неплохо. Но не всё.",
    name: "Артем"
}
Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg.

Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!
Имена авторов также должны быть случайными. Аватарки подготовлены в директории img. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
*/


