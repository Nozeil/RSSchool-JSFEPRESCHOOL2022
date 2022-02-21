getElement = (selector) => document.querySelector(selector);
getElements = (selector) => document.querySelectorAll(selector);

createElement = (element, className) => {
	element = document.createElement(element);
	element.className = className;
	return element;
}

prependElement = (parentElement, childElement) => parentElement.prepend(childElement);
appendElement = (parentElement, childElement) => parentElement.append(childElement);

const wrapper = createElement('div', 'wrapper');

const main = createElement('main', 'main');
const footer = createElement('footer', 'footer');

prependElement(getElement('.body'), wrapper);

appendElement(wrapper, main);
appendElement(wrapper, footer);

const game = createElement('section', 'game');

appendElement(main, game);

const gameText = createElement('div', 'game__text');

createTextElement = (parentElement, childElement, className, content) => {
	element = createElement(childElement, className);
	element.textContent = content;
	appendElement(parentElement, element);
	return element;
}

createTextElement(gameText, 'h1', 'game__title', 'POKEMON MEMORY GAME');
const moves = createTextElement(gameText, 'div', 'game__moves', 'Number of moves: 0');

appendElement(game, gameText);

const gameCards = createElement('div', 'game__cards');

appendElement(game, gameCards);

const numOfCards = 24;

const frontFaceImgs = ['bellsprout', 'bulbasaur', 'charmander', 'jigglypuff', 'dratini', 'eevee', 'mew', 'pidgey', 'pikachu', 'psyduck', 'squirtle', 'venonat', 'bellsprout', 'bulbasaur', 'charmander', 'jigglypuff', 'dratini', 'eevee', 'mew', 'pidgey', 'pikachu', 'psyduck', 'squirtle', 'venonat'];

let hasFlipped = false;
let hasBlocked = false;
let firstCard;
let secondCard;
let playerName;

function createBackgroundMusic() {
	const audioPlayer = createElement('audio', 'game__background-music');
	audioPlayer.src = './assets/audio/WannaDance.mp3';
	audioPlayer.autoplay = true;
	audioPlayer.loop = true;
	audioPlayer.volume = 0.1;
	appendElement(game, audioPlayer);
	return audioPlayer;
};


function createSoundEffect() {
	const soundEffects = createElement('audio', 'game__sound-effects');
	soundEffects.autoplay = true;
	appendElement(game, soundEffects);
	return soundEffects;
}

const soundEffects = createSoundEffect();
let audioPlayer;

const autorization = createElement('div', 'game__autorization');

(function createAuthorization() {
	appendElement(autorization, getPlayerName());
	const pokemonLogo = createElement('div', 'game__pokemon-logo');
	prependElement(autorization, pokemonLogo);
	autorization.addEventListener('keydown', autorizationHandler);
	createPlayButton(autorization);
	prependElement(game, autorization);
})();

function autorizationHandler(event) {
	if (event.key === 'Enter') {
		if (playerName) {
			audioPlayer = createBackgroundMusic();
			checkLocalStorage();
			updateHighscoreTable(`№${gamesCounter}`, movesCounter);
			autorization.classList.add('hidden');
			autorization.removeEventListener('keydown', autorizationHandler);
		}
	}
}

let localStorageMoves = [];
let localStorageGames = [];
let localStorageMovesKey = 'lastTenGamesMoves';
let localStorageGamesKey = 'lastTenGames';

function checkLocalStorage() {
	if (getFromLocalStorage(localStorageMovesKey) && getFromLocalStorage(localStorageGamesKey)) {
		localStorageMoves = getFromLocalStorage(localStorageMovesKey).split(',');
		localStorageGames = getFromLocalStorage(localStorageGamesKey).split(',');
		gamesCounter = +localStorageGames[localStorageGames.length - 1] + 1;
		localStorageGames.forEach((gameNum, gameIndex) => {
			updateHighscoreTable(`№${gameNum}`, localStorageMoves[gameIndex]);
		})
	}
}

function saveToLocalStorage() {
	localStorageMoves.push(movesCounter);
	localStorageGames.push(gamesCounter);
	localStorage.setItem(localStorageMovesKey, localStorageMoves);
	localStorage.setItem(localStorageGamesKey, localStorageGames);
}

function createVolumeButton() {
	const volumeButton = createElement('button', 'game__volume-button');
	volumeButton.addEventListener('click', () => {
		if (audioPlayer.muted) {
			audioPlayer.muted = false;
			volumeButton.innerHTML = '';
			volumeButton.insertAdjacentHTML('beforeend', '<svg class="game__volume-button-bg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z"/></svg>');
		}
		else {
			audioPlayer.muted = true;
			volumeButton.innerHTML = '';
			volumeButton.insertAdjacentHTML('beforeend', '<svg class="game__volume-button-bg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3.63 3.63c-.39.39-.39 1.02 0 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/></svg>');
		}
	});
	volumeButton.insertAdjacentHTML('beforeend', '<svg class="game__volume-button-bg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z"/></svg>');

	appendElement(game, volumeButton);
}

createVolumeButton();

function getFromLocalStorage(key) {
	return localStorage.getItem(key);
}

function getPlayerName() {
	const input = createElement('input', 'game__player-name');
	input.type = 'text';
	input.placeholder = 'Enter your name';
	input.required = true;
	input.autofocus = true;
	input.addEventListener('input', () => {
		playerName = input.value;
	});
	return input;
}

function createPlayButton() {
	const playButton = createElement('button', 'game__play-button');
	playButton.addEventListener('click', () => {
		if (playerName) {
			audioPlayer = createBackgroundMusic();
			checkLocalStorage();
			autorization.classList.add('hidden');
			updateHighscoreTable(`№${gamesCounter}`, movesCounter);
		}
	});
	playButton.insertAdjacentHTML('beforeend', '<svg class="game__play-button-bg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g><rect fill="none" height="20" width="20"/></g><g><path d="M10,2c-4.42,0-8,3.58-8,8s3.58,8,8,8s8-3.58,8-8S14.42,2,10,2z M8,12.59V7.41c0-0.39,0.44-0.63,0.77-0.42l4.07,2.59 c0.31,0.2,0.31,0.65,0,0.84l-4.07,2.59C8.44,13.22,8,12.98,8,12.59z"/></g></svg>');

	appendElement(autorization, playButton);
}

function flipCard() {
	if (hasBlocked) return;
	if (this === firstCard) return;
	soundEffects.volume = 0.2;
	soundEffects.src = './assets/audio/click.mp3';
	this.classList.add('flipped');
	if (!hasFlipped) {
		hasFlipped = true;
		firstCard = this;
	} else {
		secondCard = this;
		compareCards(firstCard, secondCard);
		updateMoves();
	}
	checkFlippedCards();
}

function resetVariables() {
	[hasFlipped, hasBlocked, firstCard, secondCard] = [false, false, '', ''];
}

function compareCards(firstCard, secondCard) {
	if (firstCard.lastElementChild.src === secondCard.lastElementChild.src) {
		removeListeners(firstCard, secondCard);
		soundEffects.volume = 1;
		soundEffects.src = './assets/audio/success.mp3';
	} else {
		flipCardsBack(firstCard, secondCard);
	}
}

let movesCounter = 0;

function updateMoves() {
	movesCounter++;
	moves.textContent = `Number of moves: ${movesCounter}`;
}

function flipCardsBack(firstCard, secondCard) {
	hasBlocked = true;
	soundEffects.volume = 1;
	soundEffects.src = './assets/audio/fail.mp3';
	setTimeout(() => {
		secondCard.classList.remove('flipped');
		firstCard.classList.remove('flipped');
		resetVariables();
	}, 1000);

}

function removeListeners(firstCard, secondCard) {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetVariables();
}

let randomOrder = [];

function fillRandomOrder() {
	while (randomOrder.length < numOfCards) {
		num = (Math.floor(Math.random() * (numOfCards + 1)));
		if (randomOrder.includes(num)) continue;
		if (num === numOfCards / 2) continue;
		randomOrder.push(num);
	}
};

fillRandomOrder();

function addOrderToCard(card, i) {
	card.style.order = randomOrder[i];
}

createStaticCard = () => {
	const staticCard = createElement('div', 'game__static-card');
	staticCard.style.order = numOfCards / 2;
	appendElement(gameCards, staticCard);
};

createStaticCard();

createCards = () => {
	for (let i = 0; i < numOfCards; i++) {
		const card = createElement('div', 'game__card');
		addOrderToCard(card, i);
		card.addEventListener('click', flipCard);
		const backFaceImage = createImage('game__back-face', './assets/svg/pokeball.svg', 'pokeball');
		const frontFaceImage = createImage('game__front-face', `./assets/svg/${frontFaceImgs[i]}.svg`, 'pokemon');
		appendElement(card, backFaceImage);
		appendElement(card, frontFaceImage);
		appendElement(gameCards, card);
	}
}


createImage = (className, src, alt) => {
	const img = createElement('img', className);
	img.src = src;
	img.alt = alt;
	return img;
}

createCards();

function createHighscoreTable() {
	const table = createElement('table', 'game__highscore');
	table.createCaption().className = 'game__table-caption';
	table.caption.textContent = 'Recent games score';
	table.createTHead();
	const gameHeader = createElement('th', 'game__table-header');
	gameHeader.textContent = 'Game';
	appendElement(table.tHead, gameHeader);
	const score = createElement('th', 'game__table-header');
	score.textContent = 'Score';
	appendElement(table.tHead, score);
	const tBody = table.createTBody();
	tBody.className = 'game__tBody';
	appendElement(game, table);
	return tBody;
}

let gamesCounter = 1;

const tBody = createHighscoreTable();

function updateHighscoreTable(name, score) {
	const row = tBody.insertRow();
	row.className = 'game__table-row';
	const cellName = row.insertCell();
	cellName.className = 'game__table-cell';
	cellName.textContent = name;
	const cellScore = row.insertCell();
	cellScore.className = 'game__table-cell';
	cellScore.textContent = score;
}

function createResult() {
	const gameResult = createElement('div', 'game__result hidden');
	const finalScore = createElement('div', 'game__final-score');
	const scoreText = createElement('p', 'game__final-score-text');
	scoreText.textContent = 'Your score: 0';
	appendElement(finalScore, scoreText);
	createRestartButton(finalScore);
	appendElement(gameResult, finalScore);
	appendElement(game, gameResult);
	return gameResult
}

function createRestartButton(finalScore) {
	const restartButton = createElement('button', 'game__restart-button');
	restartButton.insertAdjacentHTML('beforeend', '<svg class="game__restart-button-bg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M58,32c0,14.359-11.641,26-26,26S6,46.359,6,32C6,17.641,17.641,6,32,6S58,17.641,58,32z M45.581,23.785	c-1.845-2.961-4.678-5.273-7.941-6.478l-1.404,3.746c2.416,0.931,4.501,2.685,5.835,4.888c1.348,2.2,1.873,4.846,1.57,7.394	c-0.305,2.544-1.501,4.95-3.319,6.747c-1.814,1.799-4.221,2.973-6.745,3.261c-2.532,0.311-5.136-0.242-7.295-1.55	c-2.165-1.297-3.882-3.329-4.769-5.669c-0.903-2.326-0.991-4.98-0.245-7.35c0.48-1.56,1.321-3.001,2.415-4.212l3.145,3.493	l2.75-12.047l-12.281,1.462l3.057,3.395c-1.732,1.844-3.042,4.08-3.751,6.511c-1.017,3.433-0.833,7.176,0.502,10.485	c1.318,3.313,3.775,6.125,6.837,7.899c3.059,1.793,6.717,2.5,10.2,2.024c3.501-0.449,6.815-2.125,9.27-4.632	c2.466-2.498,4.068-5.84,4.438-9.33C48.226,30.353,47.446,26.742,45.581,23.785z"/></svg>');
	restartButton.addEventListener('click', restartGame);
	appendElement(finalScore, restartButton);
}

function restartGame() {
	if (getFromLocalStorage(localStorageMovesKey)) {
		if (getFromLocalStorage(localStorageMovesKey).split(',').length === 10) {
			localStorageMoves.shift();
			localStorageGames.shift()
		}
	}
	saveToLocalStorage();
	gamesCounter++;
	showResult();
	if (tBody.children.length === 11) {
		tBody.firstElementChild.remove();
	}
	tBody.lastElementChild.lastElementChild.textContent = movesCounter;
	gameCards.innerHTML = '';
	movesCounter = 0;
	moves.textContent = 'Number of moves: 0';
	randomOrder = [];
	fillRandomOrder();
	updateHighscoreTable(`№${gamesCounter}`, movesCounter);
	createStaticCard();
	createCards();
}

const gameResult = createResult();

function showResult() {
	gameResult.classList.toggle('hidden');
}

function checkFlippedCards() {
	if (getElements('.flipped').length === numOfCards) {
		getElement('.game__final-score-text').textContent = `Your score: ${movesCounter}`;
		showResult();
	};
}

const footerInfo = createElement('div', 'footer__footer-info');

createTextElement(footerInfo, 'div', 'footer__copy', '©');
createTextElement(footerInfo, 'div', 'footer__year', '2022');

createLink = (parentElement, className, text, href) => {
	const link = createTextElement(parentElement, 'a', className, text);
	link.href = href;
	return link;
}

createLink(footerInfo, 'footer__github link', 'nozeil', 'https://github.com/Nozeil');

appendElement(footer, footerInfo);

const rsLink = createLink(footer, 'footer__rs-link', '', 'https://rs.school/js-stage0/');

rsLink.insertAdjacentHTML('beforeend', '<svg class="footer__rs-logo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 552.8 205.3"><path d="M285.4 68l26.3-1.7c.6 4.3 1.7 7.5 3.5 9.8 2.9 3.6 6.9 5.4 12.2 5.4 3.9 0 7-.9 9.1-2.8 2-1.5 3.2-3.9 3.2-6.4 0-2.4-1.1-4.7-3-6.2-2-1.8-6.7-3.6-14.1-5.2-12.1-2.7-20.8-6.3-25.9-10.9-5.1-4.3-8-10.6-7.8-17.3 0-4.6 1.4-9.2 4-13 3-4.3 7.1-7.7 12-9.6 5.3-2.3 12.7-3.5 22-3.5 11.4 0 20.1 2.1 26.1 6.4 6 4.2 9.6 11 10.7 20.3l-26 1.5c-.7-4-2.1-6.9-4.4-8.8s-5.3-2.8-9.2-2.8c-3.2 0-5.6.7-7.2 2-1.5 1.2-2.5 3-2.4 5 0 1.5.8 2.9 2 3.8 1.3 1.2 4.4 2.3 9.3 3.3 12.1 2.6 20.7 5.2 26 7.9 5.3 2.7 9.1 6 11.4 9.9 2.4 4 3.6 8.6 3.5 13.3 0 5.6-1.6 11.2-4.8 15.9-3.3 4.9-7.9 8.7-13.3 11-5.7 2.5-12.9 3.8-21.5 3.8-15.2 0-25.7-2.9-31.6-8.8S286.1 77 285.4 68zM6.3 97.6V8.2h46.1c8.5 0 15.1.7 19.6 2.2 4.4 1.4 8.3 4.3 10.9 8.2 2.9 4.3 4.3 9.3 4.2 14.5.3 8.8-4.2 17.2-11.9 21.6-3 1.7-6.3 2.9-9.7 3.5 2.5.7 5 1.9 7.2 3.3 1.7 1.4 3.1 3 4.4 4.7 1.5 1.7 2.8 3.6 3.9 5.6l13.4 25.9H63L48.2 70.2c-1.9-3.5-3.5-5.8-5-6.9-2-1.4-4.4-2.1-6.8-2.1H34v36.3H6.3zM34 44.4h11.7c2.5-.2 4.9-.6 7.3-1.2 1.8-.3 3.4-1.3 4.5-2.8 2.7-3.6 2.3-8.7-1-11.8-1.8-1.5-5.3-2.3-10.3-2.3H34v18.1zM0 174.2l26.3-1.7c.6 4.3 1.7 7.5 3.5 9.8 2.8 3.6 6.9 5.5 12.2 5.5 3.9 0 7-.9 9.1-2.8 2-1.6 3.2-3.9 3.2-6.4 0-2.4-1.1-4.7-3-6.2-2-1.8-6.7-3.6-14.2-5.2-12.1-2.7-20.8-6.3-25.9-10.9-5.1-4.3-8-10.6-7.8-17.3 0-4.6 1.4-9.2 4-13 3-4.3 7.1-7.7 12-9.6 5.3-2.3 12.7-3.5 22-3.5 11.4 0 20.1 2.1 26.1 6.4s9.5 11 10.6 20.3l-26 1.5c-.7-4-2.1-6.9-4.4-8.8-2.2-1.9-5.3-2.8-9.2-2.7-3.2 0-5.6.7-7.2 2.1-1.6 1.2-2.5 3-2.4 5 0 1.5.8 2.9 2 3.8 1.3 1.2 4.4 2.3 9.3 3.3 12.1 2.6 20.7 5.2 26 7.9 5.3 2.7 9.1 6 11.4 9.9 2.4 4 3.6 8.6 3.6 13.2 0 5.6-1.7 11.1-4.8 15.8-3.3 4.9-7.9 8.7-13.3 11-5.7 2.5-12.9 3.8-21.5 3.8-15.2 0-25.7-2.9-31.6-8.8-5.9-6-9.2-13.4-10-22.4z" /> <path d="M133 167.2l24.2 7.3c-1.3 6.1-4 11.9-7.7 17-3.4 4.5-7.9 8-13 10.3-5.2 2.3-11.8 3.5-19.8 3.5-9.7 0-17.7-1.4-23.8-4.2-6.2-2.8-11.5-7.8-16-14.9-4.5-7.1-6.7-16.2-6.7-27.3 0-14.8 3.9-26.2 11.8-34.1s19-11.9 33.4-11.9c11.3 0 20.1 2.3 26.6 6.8 6.4 4.6 11.2 11.6 14.4 21l-24.4 5.4c-.6-2.1-1.5-4.2-2.7-6-1.5-2.1-3.4-3.7-5.7-4.9-2.3-1.2-4.9-1.7-7.5-1.7-6.3 0-11.1 2.5-14.4 7.6-2.5 3.7-3.8 9.6-3.8 17.6 0 9.9 1.5 16.7 4.5 20.4 3 3.7 7.2 5.5 12.7 5.5 5.3 0 9.3-1.5 12-4.4 2.7-3.1 4.7-7.4 5.9-13zm56.5-52.8h27.6v31.3h30.2v-31.3h27.8v89.4h-27.8v-36.2h-30.2v36.2h-27.6v-89.4z" /> <path d="M271.3 159.1c0-14.6 4.1-26 12.2-34.1 8.1-8.1 19.5-12.2 34-12.2 14.9 0 26.3 4 34.4 12S364 144 364 158.4c0 10.5-1.8 19-5.3 25.7-3.4 6.6-8.7 12-15.2 15.6-6.7 3.7-15 5.6-24.9 5.6-10.1 0-18.4-1.6-25-4.8-6.8-3.4-12.4-8.7-16.1-15.2-4.1-7-6.2-15.7-6.2-26.2zm27.6.1c0 9 1.7 15.5 5 19.5 3.3 3.9 7.9 5.9 13.7 5.9 5.9 0 10.5-1.9 13.8-5.8s4.9-10.8 4.9-20.8c0-8.4-1.7-14.6-5.1-18.4-3.4-3.9-8-5.8-13.8-5.8-5.1-.2-10 2-13.4 5.9-3.4 3.9-5.1 10.4-5.1 19.5zm93.4-.1c0-14.6 4.1-26 12.2-34.1 8.1-8.1 19.5-12.2 34-12.2 14.9 0 26.4 4 34.4 12S485 144 485 158.4c0 10.5-1.8 19-5.3 25.7-3.4 6.6-8.7 12-15.2 15.6-6.7 3.7-15 5.6-24.9 5.6-10.1 0-18.4-1.6-25-4.8-6.8-3.4-12.4-8.7-16.1-15.2-4.1-7-6.2-15.7-6.2-26.2zm27.6.1c0 9 1.7 15.5 5 19.5 3.3 3.9 7.9 5.9 13.7 5.9 5.9 0 10.5-1.9 13.8-5.8 3.3-3.9 4.9-10.8 4.9-20.8 0-8.4-1.7-14.6-5.1-18.4-3.4-3.9-8-5.8-13.8-5.8-5.1-.2-10.1 2-13.4 5.9-3.4 3.9-5.1 10.4-5.1 19.5z" /> <path d="M482.1 114.4h27.6v67.4h43.1v22H482v-89.4z" /> <ellipse transform="rotate(-37.001 420.46 67.88)" class="st0" cx="420.5" cy="67.9" rx="63" ry="51.8" /> <defs> <ellipse id="SVGID_1_" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8" /> </defs> <clipPath id="SVGID_2_"> <use xlink:href="#SVGID_1_" overflow="visible" /> </clipPath> <g class="st1"> <path transform="rotate(-37.001 420.82 68.353)" class="st0" d="M330.9-14.2h179.8v165.1H330.9z" /> <g id="Layer_2_1_"> <defs> <path id="SVGID_3_" transform="rotate(-37.001 420.82 68.353)" d="M330.9-14.2h179.8v165.1H330.9z" /> </defs> <clipPath id="SVGID_4_"> <use xlink:href="#SVGID_3_" overflow="visible" /> </clipPath> <g id="Layer_1-2" class="st2"> <ellipse transform="rotate(-37.001 420.46 67.88)" class="st0" cx="420.5" cy="67.9" rx="63" ry="51.8" /> <defs> <ellipse id="SVGID_5_" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8" /> </defs> <clipPath id="SVGID_6_"> <use xlink:href="#SVGID_5_" overflow="visible" /> </clipPath> <g class="st3"> <path transform="rotate(-37 420.799 68.802)" class="st0" d="M357.8 17h125.9v103.7H357.8z" /> <defs> <path id="SVGID_7_" transform="rotate(-37 420.799 68.802)" d="M357.8 17h125.9v103.7H357.8z" /> </defs> <clipPath id="SVGID_8_"> <use xlink:href="#SVGID_7_" overflow="visible" /> </clipPath> <g class="st4"> <ellipse transform="rotate(-37.001 420.46 67.88)" class="st5" cx="420.5" cy="67.9" rx="63" ry="51.8" /> </g> <path transform="rotate(-37 420.799 68.802)" class="st6" d="M357.8 17h125.9v103.7H357.8z" /> <ellipse transform="rotate(-37.001 420.46 67.88)" class="st7" cx="420.5" cy="67.9" rx="63" ry="51.8" /> <path transform="rotate(-37 420.799 68.802)" class="st0" d="M357.8 17h125.9v103.7H357.8z" /> <defs> <path id="SVGID_9_" transform="rotate(-37 420.799 68.802)" d="M357.8 17h125.9v103.7H357.8z" /> </defs> <clipPath id="SVGID_10_"> <use xlink:href="#SVGID_9_" overflow="visible" /> </clipPath> <g class="st8"> <ellipse transform="rotate(-37.001 420.46 67.88)" class="st5" cx="420.5" cy="67.9" rx="63" ry="51.8" /> </g> <path transform="rotate(-37 420.799 68.802)" class="st9" d="M357.8 17h125.9v103.7H357.8z" /> <path transform="rotate(-37.001 420.82 68.353)" class="st7" d="M330.9-14.2h179.8v165.1H330.9z" /> </g> <ellipse transform="rotate(-37.001 420.46 67.88)" class="st7" cx="420.5" cy="67.9" rx="63" ry="51.8" /> <path d="M392.4 61.3l10-7 12.3 17.5c2.1 2.8 3.7 5.8 4.9 9.1.7 2.5.5 5.2-.5 7.6-1.3 3-3.4 5.5-6.2 7.3-3.3 2.3-6.1 3.6-8.5 4-2.3.4-4.7 0-6.9-1-2.4-1.2-4.5-2.9-6.1-5.1l8.6-8c.7 1.1 1.6 2.1 2.6 2.9.7.5 1.5.8 2.4.8.7 0 1.4-.3 1.9-.7 1-.6 1.7-1.8 1.6-3-.3-1.7-1-3.4-2.1-4.7l-14-19.7zm30 11.1l9.1-7.2c1 1.2 2.3 2.1 3.7 2.6 2 .6 4.1.2 5.8-1.1 1.2-.8 2.2-1.9 2.6-3.3.6-1.8-.4-3.8-2.2-4.4-.3-.1-.6-.2-.9-.2-1.2-.1-3.3.4-6.4 1.7-5.1 2.1-9.1 2.9-12.1 2.6-2.9-.3-5.6-1.8-7.2-4.3-1.2-1.7-1.8-3.7-1.9-5.7 0-2.3.6-4.6 1.9-6.5 1.9-2.7 4.2-5 7-6.8 4.2-2.9 7.9-4.3 11.1-4.3 3.2 0 6.2 1.5 9 4.6l-9 7.1c-1.8-2.3-5.2-2.8-7.5-1l-.3.3c-1 .6-1.7 1.5-2.1 2.6-.3.8-.1 1.7.4 2.4.4.5 1 .9 1.7.9.8.1 2.2-.3 4.2-1.2 5-2.1 8.8-3.3 11.4-3.7 2.2-.4 4.5-.2 6.6.7 1.9.8 3.5 2.2 4.6 3.9 1.4 2 2.2 4.4 2.3 6.9.1 2.6-.6 5.1-2 7.3-1.8 2.7-4.1 5-6.8 6.8-5.5 3.8-10 5.4-13.6 4.8-3.9-.6-7.1-2.6-9.4-5.5z" /> </g> </g> </g> </svg>');

console.log('1.Вёрстка +10\n-реализован интерфейс игры +5\n -в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n2.Логика игры.Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10\n3.Игра завершается, когда открыты все карточки +10\n4.По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10\n5.Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10\n6.По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10\n7.Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n-высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо\nScore: 70 => 60');

//не успел отрефакторить код(