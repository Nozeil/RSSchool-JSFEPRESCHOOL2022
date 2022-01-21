'use strict'
const navigation = document.querySelector('.nav');
const burger = document.querySelector('.burger');
const transparentBg = document.querySelector('.transparent-bg');
burger.addEventListener('click', () => {
	burger.classList.toggle('is-active');
	navigation.classList.toggle('is-active');
	transparentBg.classList.toggle('is-active');
});
navigation.addEventListener('click', (event) => {
	if (event.target.classList.contains('nav-link')) {
		burger.classList.remove('is-active');
		navigation.classList.remove('is-active');
		transparentBg.classList.remove('is-active');
	}
});

console.log('1.Вёрстка соответствует макету. Ширина экрана 768px +48.\n2.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15.\n3.На ширине экрана 768рх и меньше реализовано адаптивное меню +22.\nTotal 85/85 => 75');
