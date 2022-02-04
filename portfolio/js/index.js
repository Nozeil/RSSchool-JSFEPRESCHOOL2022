import translateEnRuObj from "./translateEnRu.js";
const navigation = document.querySelector('.nav');
const burger = document.querySelector('.burger');
const transparentBg = document.querySelector('.transparent-bg');
const portfolioImgs = document.querySelectorAll('.portfolio-image');
const sectionPortfolioBtns = document.querySelector('.section-portfolio-buttons');
const portfolioBtns = document.querySelectorAll('.portfolio-button');
const seasons = ['winter', 'spring', 'summer', 'autumn'];
const lngDiv = document.querySelector('.switch-lng');
const lngButtons = document.querySelectorAll('.switch-lng-button');
const themeIconLogo = document.querySelector('.theme-icon-logo');
const themeButton = document.querySelector('.theme-button');
let lightElems = ['.body', '.header-container', '.nav', '.icon', '.theme-icon', '.switch-lng-button', '.burger-line', '.hero-container', '.link', , '.button', '.section-title', '.section-title-container', '.controls', '.dollars-price', '.contact-container', '.section-title-contact', '.input', '.textarea'];
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
		portfolioImgs.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.i18n}/portfolio-img-${index + 1}.jpg`
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
		img.src = `./assets/img/${season}/portfolio-img-${index + 1}.jpg`;
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
	if (themeIconLogo.classList.contains('light-theme')) themeIconLogo.href.baseVal = './assets/svg/sprite.svg#moon';
	else themeIconLogo.href.baseVal = './assets/svg/sprite.svg#sun';
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

const videoPlayer = document.querySelector('.video-player');
const playButton = document.querySelector('.play-button');
const videoControls = document.querySelector('.controls');
const sectionVideoPlayer = document.querySelector('.section-video-player');
const volumeButton = document.querySelector('.volume-button');
const volumeButtonIcons = document.querySelectorAll('.volume-button-icon');
const volumeBar = document.querySelector('.volume-bar');
const smallPlayButton = document.querySelector('.small-play-button');
const smallPlayButtonIcon = document.querySelectorAll('.small-play-button-icon');
const poster = document.querySelector('.poster');
const currentVideoTimeSpan = document.querySelector('.current-video-time');
const videoDurationSpan = document.querySelector('.video-duration');
const progressCoefficent = 100 / videoPlayer.duration;
let lastVolume;

function toPlayOrPause() {
	togglePlay();
	toggleSmallPlayIcon();
	(videoPlayer.paused) ? videoPlayer.play() : videoPlayer.pause();
}

function togglePlay() {
	playButton.classList.toggle('video-is-playing');
	smallPlayButton.classList.toggle('video-is-playing');
}

function toggleSmallPlayIcon() {
	smallPlayButtonIcon.forEach(smallPlayIcon => smallPlayIcon.classList.toggle('hidden-icon'));
}

function showControls() {
	if (poster.classList.contains('hidden')) videoControls.classList.remove('hidden');
}

function hideControls() {
	videoControls.classList.add('hidden');
}

function toggleVolumeIcon() {
	volumeButtonIcons.forEach(volumeIcon => volumeIcon.classList.toggle('hidden-icon'));
}

function switchMuteVolume(event) {
	if (!event.target.classList.contains('mute')) {
		videoPlayer.muted = false;
		volumeBar.value = lastVolume;
		videoPlayer.volume = lastVolume / 100;
	}
	else {
		lastVolume = volumeBar.value;
		videoPlayer.muted = true;
		volumeBar.value = volumeBar.min;
	}
}

function toggleVolume() {
	videoPlayer.volume = volumeBar.value / 100;
	if (videoPlayer.volume === 0) {
		videoPlayer.muted = true;
		toggleVolumeIcon();
	} else {
		if (videoPlayer.volume > 0 && videoPlayer.muted === true) {
			toggleVolumeIcon();
		}
		videoPlayer.muted = false;
	}
}

toggleVolume();

const progressBar = document.querySelector('.progress-bar');

function rewind() {
	progressBar.max = Math.round(videoPlayer.duration);
	videoPlayer.currentTime = progressBar.value;
}

function videoPlayerTimeUpdate() {
	progressBar.max = Math.round(videoPlayer.duration);
	videoDurationSpan.textContent = `0:${Math.round(videoPlayer.duration)}`;
	progressBar.value = videoPlayer.currentTime;
	changeProgressBackground();
	(Math.round(videoPlayer.currentTime) < 10) ? currentVideoTimeSpan.textContent = `0:0${Math.round(videoPlayer.currentTime)}` : currentVideoTimeSpan.textContent = `0:${Math.round(videoPlayer.currentTime)}`;
	returnPlayButtons();
}

function returnPlayButtons() {
	if (videoPlayer.currentTime === videoPlayer.duration) {
		togglePlay();
		toggleSmallPlayIcon();
	}
}

function hidePoster() {
	if (!poster.classList.contains('hidden')) poster.classList.add('hidden');
}

function changeProgressBackground() {
	progressBar.style.background = `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${progressBar.value * progressCoefficent}%, var(--color-grey) 0%, var(--color-grey) 0%`;
}

function changeVolumeBackground() {
	volumeBar.style.background = `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${volumeBar.value}%, var(--color-grey) 0%, var(--color-grey) 0%`;
}

playButton.addEventListener('click', toPlayOrPause);
videoPlayer.addEventListener('click', toPlayOrPause);
smallPlayButton.addEventListener('click', toPlayOrPause);
videoPlayer.addEventListener('play', hidePoster);
videoPlayer.addEventListener('play', showControls);
sectionVideoPlayer.addEventListener('mouseenter', showControls);
sectionVideoPlayer.addEventListener('mouseleave', hideControls);
volumeButton.addEventListener('click', toggleVolumeIcon);
volumeButton.addEventListener('click', switchMuteVolume);
volumeButton.addEventListener('click', changeVolumeBackground);
volumeBar.addEventListener('input', toggleVolume);
progressBar.addEventListener('input', rewind);
videoPlayer.addEventListener('timeupdate', videoPlayerTimeUpdate);
volumeBar.addEventListener('input', changeVolumeBackground);
progressBar.addEventListener('input', changeProgressBackground);

console.log('1.Вёрстка +10\n -вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5\n -в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n 2.Кнопка Play/Pause на панели управления +10\n -при клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5\n -внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5\n 3.Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10\n 4.При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10\n 5.При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10\n 6.Кнопка Play/Pause в центре видео +10\n -есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления +5\n -когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается +5\n 7.Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n Total: 70 => 60');
