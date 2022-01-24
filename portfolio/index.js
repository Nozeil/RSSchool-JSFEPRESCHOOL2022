'use strict'
const navigation = document.querySelector('.nav');
const burger = document.querySelector('.burger');
const transparentBg = document.querySelector('.transparent-bg');
const portfolioImgs = document.querySelectorAll('.portfolio-image');
const sectionPortfolioBtns = document.querySelector('.section-portfolio-buttons');
const portfolioBtns = document.querySelectorAll('.portfolio-button');
const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];

function toogleMenuClass() {
	burger.classList.toggle('is-active');
	navigation.classList.toggle('is-active');
	transparentBg.classList.toggle('is-active');
}

burger.addEventListener('click', toogleMenuClass);

function removeMenuClass(event) {
	if (event.target.classList.contains('nav-link')) {
		burger.classList.remove('is-active');
		navigation.classList.remove('is-active');
		transparentBg.classList.remove('is-active');
	}
}

navigation.addEventListener('click', removeMenuClass);

function changePortfolioImgs(event) {
	if (event.target.classList.contains('portfolio-button')) {
		portfolioImgs.forEach((img, index) => img.src = `assets/img/${event.target.textContent}/portfolio-img-${index + 1}.jpg`
		);
	}
}

sectionPortfolioBtns.addEventListener('click', changePortfolioImgs);

function changePortfolioBtnsClass(event) {
	if (event.target.classList.contains('portfolio-button')) {
		portfolioBtns.forEach(btn => btn.classList.remove('active-button'));
		event.target.classList.add('active-button');
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

console.log('1.Вёрстка соответствует макету. Ширина экрана 768px +48.\n2.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15.\n3.На ширине экрана 768рх и меньше реализовано адаптивное меню +22.\nTotal 85/85 => 75');
