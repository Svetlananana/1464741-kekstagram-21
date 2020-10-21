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

const DESCRIPTION_PHOTO = [
  `если ты сильный, значит сильнее того, кто слабее`,
  `Плачу на техно!`,
  `ууфь, ша-ла-ла!`,
  `Ведь, если звезды зажигают —
значит — это кому-нибудь нужно?`,
  `Продам гараж`,
  `Историю составляют только люди, нарушающие правила`,
  `Лучше быть последним - первым, чем первым - последним`
];

const PHOTOS_OBJECT_TOTAL = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_AVATAR = 6;
const MAX_COMMENTS = 4;

const similarPictureTemplate = document
  .querySelector(`#picture`)
  .content.querySelector(`.picture`);
const newPictures = document.querySelector(`.pictures`);

const getRandomNumber = (min, max) =>
  min + Math.floor(Math.random() * (max - min - 1));

const photosArray = [];
const createMockObjects = () => {
  for (let i = 0; i < PHOTOS_OBJECT_TOTAL; i++) {
    photosArray[i] = {
      url: `photos/${i + 1}.jpg`,
      description: DESCRIPTION_PHOTO[getRandomNumber(0, DESCRIPTION_PHOTO.length)],
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: createComments(getRandomNumber(1, MAX_COMMENTS)),
    };
  }
  return photosArray;
};

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

for (let i = 0; i < photosArray.length; i++) {
  const photosElement = similarPictureTemplate.cloneNode(true);

  photosElement.querySelector(`.picture__img`).src = photosArray[i].url;
  photosElement.querySelector(`.picture__comments`).textContent =
    photosArray[i].comments.length;
  photosElement.querySelector(`.picture__likes`).textContent =
    photosArray[i].likes;
  newPictures.appendChild(photosElement);
}

// вторая часть

const bigPicture = document.querySelector(`.big-picture`);
bigPicture.classList.remove(`hidden`);

const fillCommentsList = (parentComments, comments) => {
  parentComments.innerHTML = ``;
  const fragment = document.createDocumentFragment();

  comments.forEach(function (comment) {
    const socialComment = document.createElement(`li`);
    socialComment.classList.add(`social__comment`);

    const socialPicture = document.createElement(`img`);
    socialPicture.classList.add(`social__picture`);
    socialComment.append(socialPicture);
    socialPicture.setAttribute(`src`, `${comment.avatar}`);
    socialPicture.setAttribute(`alt`, `${comment.name}`);
    socialPicture.setAttribute(`width`, `35`);
    socialPicture.setAttribute(`height`, `35`);

    const socialText = document.createElement(`p`);
    socialText.classList.add(`social__text`);
    socialText.textContent = comment.message;
    socialComment.append(socialText);
    fragment.append(socialComment);
  });
  parentComments.append(fragment);
};

const createSocialComment = function (targetPhoto) {
  document.querySelector(`.big-picture__img`).firstElementChild.src =
    targetPhoto.url;
  document.querySelector(`.likes-count`).textContent = targetPhoto.likes;
  document.querySelector(`.comments-count`).textContent =
    targetPhoto.comments.length;
  document.querySelector(`.social__caption`).textContent =
    targetPhoto.description;

  const parentComments = document.querySelector(`.social__comments`);
  fillCommentsList(parentComments, targetPhoto.comments);
};

const targetPhoto = photosArray[0];
createSocialComment(targetPhoto);

document.querySelector(`.social__comment-count`).classList.add(`hidden`);
document.querySelector(`.comments-loader`).classList.add(`hidden`);
document.querySelector(`body`).classList.add(`modal-open`);
