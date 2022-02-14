function getContainer(container) {
	return document.querySelector(container);
}

function appendItem(container, el) {
	getContainer(container).append(el);
}

function clearContainer(container) {
	return getContainer(container).innerHTML = '';
}

class Card {

	createCard(path, rating, titleClassName, title, overviewText) {
		const div = document.createElement('div');
		div.className = 'card';
		div.append(this.createPoster(path), this.createRating(rating), this.createTitle(titleClassName, title), this.createOverview(overviewText));
		return div;
	}

	createPoster(path) {
		const img = document.createElement('img');
		img.className = 'card__poster';
		img.src = `https://image.tmdb.org/t/p/w1280${path}`;
		img.alt = 'poster';
		return img;
	}

	createRating(rating) {
		const div = document.createElement('div');
		(rating >= 8) ? div.className = 'card__rating card__rating_green' :
			(rating >= 5) ? div.className = 'card__rating card__rating_orange' :
				div.className = 'card__rating card__rating_red';
		div.append(rating.toFixed(1));
		return div;
	}

	createTitle(titleClassName, title) {
		const h3 = document.createElement('h3');
		h3.className = titleClassName;
		h3.append(title);
		return h3;
	}

	createOverview(text) {
		const div = document.createElement('div');
		div.className = 'overview';
		div.append(this.createTitle('overview__title', 'Overview'), text);
		return div;
	}

}

const card = new Card();

async function getPopularFilmsData() {
	const response = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1bf5e62d3406ea36ddc8563c7b71f2de');
	const data = await response.json();
	data.results.forEach(result => appendItem('.main-container', card.createCard(result.poster_path, result.vote_average, 'card__title', result.title, result.overview)));
}

getPopularFilmsData();

class Search {

	createSearch() {
		const div = document.createElement('div');
		div.className = 'search';
		div.append(this.createSearchInput(), this.createSearchButton());
		return div;
	}

	createSearchButton() {
		const button = document.createElement('button');
		button.className = 'search__button';
		return button;
	}

	createSearchInput() {
		const input = document.createElement('input');
		input.className = 'search__input';
		input.type = 'search';
		input.placeholder = 'Search movie';
		input.autofocus = true;
		input.autocomplete = 'off';
		input.addEventListener('keydown', (event) => {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				searchData(input.value);
			}
		})
		return input;
	}

}

const search = new Search();
appendItem('.header-container', search.createSearch());

async function searchData(word) {
	const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1bf5e62d3406ea36ddc8563c7b71f2de&query=${word}`);
	const data = await response.json();
	clearContainer('.main-container');
	data.results.forEach(result => appendItem('.main-container', card.createCard(result.poster_path, result.vote_average, 'card__title', result.title, result.overview)));
}
class Footer {

	createFooterData() {
		const div = document.createElement('div');
		div.className = 'footer-data';
		div.append(this.createCopyrightSign(), this.createYear(), this.createGitHub());
		getContainer('.footer-container').append(div);
		return div;
	}

	createCopyrightSign() {
		const span = document.createElement('span');
		span.className = 'copyright-sign';
		span.textContent = '©';
		return span;
	}

	createYear() {
		const span = document.createElement('span');
		span.className = 'year';
		span.textContent = '2022';
		return span;
	}

	createGitHub() {
		const a = document.createElement('a');
		a.className = 'github link';
		a.href = 'https://github.com/Nozeil';
		a.textContent = 'Nozeil';
		return a;
	}

	createRsLogo() {
		const a = document.createElement('a');
		a.className = 'rs link';
		a.href = 'https://rs.school/js-stage0/';
		getContainer('.footer-container').append(a);
	}

}

const footer = new Footer();
footer.createFooterData();
footer.createRsLogo();

console.log('1)Вёрстка +10\n-на странице есть несколько карточек фильмов и строка поиска. На каждой карточке фильма есть постер и название фильма. Также на карточке может быть другая информация, которую предоставляет API, например, описание фильма, его рейтинг на IMDb и т.д. +5 \n-в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n 2)При загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10\n 3)Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10\n 4)Поиск +30\n-при открытии приложения курсор находится в поле ввода +5\n-есть placeholder +5\n-автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5\n-поисковый запрос можно отправить нажатием клавиши Enter +5\n-после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5\n-в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5\n5)Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n-высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо\n-дополнительным функционалом может быть, например, наличие на карточке фильма его описания и рейтинга на IMDb');