import translateEnRuObj from "./translateEnRu.js";
const navigation = document.querySelector('.nav');
const burger = document.querySelector('.burger');
const transparentBg = document.querySelector('.transparent-bg');
const portfolioImgs = document.querySelectorAll('.portfolio-image');
const sectionPortfolioBtns = document.querySelector('.section-portfolio-buttons');
const portfolioBtns = document.querySelectorAll('.portfolio-button');
const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
const lngDiv = document.querySelector('.switch-lng');
const lngButtons = document.querySelectorAll('.switch-lng-button');
const themeIconLogo = document.querySelector('.theme-icon-logo');
const themeButton = document.querySelector('.theme-button');
let lightElems = ['.body', '.header-container', '.nav', '.icon', '.theme-icon', '.switch-lng-button', '.burger-line', '.hero-container', '.link', , '.button', '.section-title', '.section-title-container', '.dollars-price', '.contact-container', '.section-title-contact', '.input', '.textarea'];
let lang = 'EN';
let theme = 'darkTheme';
const buttons = document.querySelectorAll('.button');

function toggleMenuClass() {
	burger.classList.toggle('menu-is-active');
	navigation.classList.toggle('menu-is-active');
	transparentBg.classList.toggle('menu-is-active');
}

burger.addEventListener('click', toggleMenuClass);

function removeMenuClass(event) {
	if (event.target.classList.contains('nav-link')) {
		burger.classList.remove('menu-is-active');
		navigation.classList.remove('menu-is-active');
		transparentBg.classList.remove('menu-is-active');
	}
}

navigation.addEventListener('click', removeMenuClass);

function changePortfolioImgs(event) {
	if (event.target.classList.contains('portfolio-button')) {
		portfolioImgs.forEach((img, index) => img.src = `assets/img/${event.target.dataset.i18n}/portfolio-img-${index + 1}.jpg`
		);
	}
}

sectionPortfolioBtns.addEventListener('click', changePortfolioImgs);

function switchPortfolioBtnsClass(event) {
	if (event.target.classList.contains('portfolio-button')) {
		portfolioBtns.forEach(btn => btn.classList.remove('active-portfolio-button'));
		event.target.classList.add('active-portfolio-button');
	}
}

sectionPortfolioBtns.addEventListener('click', switchPortfolioBtnsClass);

function preloadImages() {
	seasons.forEach(season => portfolioImgs.forEach((img, index) => {
		img = new Image();
		img.src = `assets/img/${season}/portfolio-img-${index + 1}.jpg`;
	})
	)
}

preloadImages();

function switchLang(event) {
	if (event.target.classList.contains('inactive-lng')) {
		(lang === 'RU') ? lang = 'EN' : lang = 'RU';
		switchLanguageBtnsClass();
		getTranslate(lang);
	}
}

function getTranslate(language) {
	const dataI18n = document.querySelectorAll('[data-i18n]');
	dataI18n.forEach(el => {
		if (el.placeholder) el.placeholder = translateEnRuObj[language][el.dataset.i18n];
		else el.innerHTML = translateEnRuObj[language][el.dataset.i18n];
	});
}

function switchLanguageBtnsClass() {
	lngButtons.forEach(button => {
		if (button.classList.contains('active-lng')) {
			button.classList.remove('active-lng');
			button.classList.add('inactive-lng');
		}
		else if (button.classList.contains('inactive-lng')) {
			button.classList.remove('inactive-lng');
			button.classList.add('active-lng');
		}
	})
}

lngDiv.addEventListener('click', switchLang);

function changeTheme() {
	(theme === 'darkTheme') ? theme = 'lightTheme' : theme = 'darkTheme';
	lightElems.forEach(elem => document.querySelectorAll(elem).forEach(elOfcollection => elOfcollection.classList.toggle('light-theme')));

	themeIconLogo.classList.toggle('light-theme');
	if (themeIconLogo.classList.contains('light-theme')) themeIconLogo.href.baseVal = 'assets/svg/sprite.svg#moon';
	else themeIconLogo.href.baseVal = 'assets/svg/sprite.svg#sun';
}

themeButton.addEventListener('click', changeTheme);

function setLocalStorage() {
	localStorage.setItem('lang', lang);
	localStorage.setItem('theme', theme);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
	if (localStorage.getItem('lang')) {
		lang = localStorage.getItem('lang');
		getTranslate(lang);
		if (lang === 'RU') switchLanguageBtnsClass();
	}
	if (localStorage.getItem('theme') && localStorage.getItem('theme') === 'lightTheme') {
		changeTheme();
	}
}

window.addEventListener('load', getLocalStorage);

function createButtonClickEffect() {

	const clickEffect = document.createElement('div');

	function findClickCoords(event) {
		let clickCoords = event.target.getBoundingClientRect();
		const xCoord = event.clientX - clickCoords.left;
		const yCoord = event.clientY - clickCoords.top;
		createCircle(xCoord, yCoord);
	}

	function createCircle(x, y) {
		clickEffect.className = 'button-click-effect';
		clickEffect.style.top = y + 'px';
		clickEffect.style.left = x + 'px';
	}

	function removeCircle() {
		setTimeout(() => clickEffect.remove(), 500);
	}

	function makeEffect(event) {
		findClickCoords(event);
		event.target.append(clickEffect);
		removeCircle();
	}

	buttons.forEach(button => {
		button.addEventListener('click', makeEffect);
	})
}

createButtonClickEffect();

console.log('1.Смена изображений в секции portfolio +25\n2.Перевод страницы на два языка +25\n3.Переключение светлой и тёмной темы +25\n4.Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5\n5.Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5\n Score: 85/85 => 75');