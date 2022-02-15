const getElement = (element) => document.querySelector(element);

const createElement = (element, className) => {
	element = document.createElement(element);
	element.className = className;
	return element;
}

const prependElement = (parentElement, childElement) => parentElement.prepend(childElement);
const appendElement = (parentElement, childElement) => parentElement.append(childElement);

const wrapper = createElement('div', 'wrapper');
const header = createElement('header', 'header');
const main = createElement('main', 'main');
const footer = createElement('footer', 'footer');

prependElement(getElement('.body'), wrapper);

appendElement(wrapper, header);
appendElement(wrapper, main);
appendElement(wrapper, footer);

const gameContainer = createElement('div', 'game');

appendElement(main, gameContainer);

const cards = createElement('div', 'cards');
const info = createElement('div', 'info');

appendElement(gameContainer, cards);
appendElement(gameContainer, info);

const infoAbout = createElement('div', 'info__about');
const infoScore = createElement('div', 'info__score');


appendElement(info, infoAbout);
appendElement(info, infoScore);






