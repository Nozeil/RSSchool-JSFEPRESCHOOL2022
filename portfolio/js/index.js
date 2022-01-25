import translateEnRuObj from "./translateEnRu.js";
const navigation = document.querySelector('.nav');
const burger = document.querySelector('.burger');
const transparentBg = document.querySelector('.transparent-bg');
const portfolioImgs = document.querySelectorAll('.portfolio-image');
const sectionPortfolioBtns = document.querySelector('.section-portfolio-buttons');
const portfolioBtns = document.querySelectorAll('.portfolio-button');
const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
const switchLng = document.querySelector('.switch-lng');
const lngButtons = document.querySelectorAll('.switch-lng-button');

function toogleMenuClass() {
	burger.classList.toggle('menu-is-active');
	navigation.classList.toggle('menu-is-active');
	transparentBg.classList.toggle('menu-is-active');
}

burger.addEventListener('click', toogleMenuClass);

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

function changePortfolioBtnsClass(event) {
	if (event.target.classList.contains('portfolio-button')) {
		portfolioBtns.forEach(btn => btn.classList.remove('active-portfolio-button'));
		event.target.classList.add('active-portfolio-button');
	}
}

sectionPortfolioBtns.addEventListener('click', changePortfolioBtnsClass);

function preloadImages() {
	seasons.forEach(season => portfolioImgs.forEach((img, index) => {
		img = new Image();
		img.src = `assets/img/${season}/portfolio-img-${index + 1}.jpg`;
	})
	)
}

preloadImages();

function getTranslate(language) {
	language = document.querySelector('.active-lng').innerHTML.trim();
	const dataI18n = document.querySelectorAll('[data-i18n]');
	dataI18n.forEach(el => {
		if (el.placeholder) el.placeholder = translateEnRuObj[language][el.dataset.i18n];
		el.innerHTML = translateEnRuObj[language][el.dataset.i18n];
	});
}

function changeLanguageBtnsClass(event) {
	if (event.target.classList.contains('switch-lng-button')) {
		lngButtons.forEach(button => button.classList.remove('active-lng'));
		event.target.classList.add('active-lng');
	}
}

switchLng.addEventListener('click',changeLanguageBtnsClass);

switchLng.addEventListener('click', getTranslate);

console.log('1.Вёрстка соответствует макету. Ширина экрана 768px +48.\n2.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15.\n3.На ширине экрана 768рх и меньше реализовано адаптивное меню +22.\nTotal 85/85 => 75');
