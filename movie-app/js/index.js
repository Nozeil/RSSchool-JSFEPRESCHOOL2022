class Card {

	getMainContainer() {
		const mainContainer = document.querySelector('.main-container');
		return mainContainer;
	}

	createCard(path, rating, title, titleClassName, overviewText) {
		const div = document.createElement('div');
		div.className = 'card';
		div.append(this.createPoster(path), this.createRating(rating), this.createTitle(title, titleClassName), this.createOverview(overviewText));
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
		if (rating >= 8) {
			div.className = 'card__rating card__rating_green';
		} else if (rating >= 5) {
			div.className = 'card__rating card__rating_orange';
		} else {
			div.className = 'card__rating card__rating_red';
		}
		div.append(rating.toFixed(1));
		return div;
	}

	createTitle(title, titleClassName) {
		const h3 = document.createElement('h3');
		h3.className = titleClassName;
		h3.append(title);
		return h3;
	}

	createOverview(text) {
		const div = document.createElement('div');
		div.className = 'overview';
		div.append(this.createTitle('Overview', 'overview__title'), text);
		return div;
	}

	appendCard(el) {
		this.getMainContainer().append(el);
	}

}

const card = new Card();

async function getPopularFilmsData() {
	const response = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1bf5e62d3406ea36ddc8563c7b71f2de');
	const data = await response.json();
	data.results.forEach(result => {
		card.appendCard(card.createCard(result.poster_path, result.vote_average, result.title, 'card__title', result.overview))
	});
}

getPopularFilmsData();

class Search {

	getHeaderContainer() {
		const headerContainer = document.querySelector('.header-container');
		return headerContainer;
	}

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
		input.name = 'q';
		input.placeholder = 'Search movie';
		input.autofocus = true;
		input.autocomplete = 'off';
		input.addEventListener('keydown', (event) => {
			if (event.code === 'Enter') {
				searchData(input.value);
			}
		})
		return input;
	}

	appendSearch() {
		this.getHeaderContainer().append(this.createSearch());
	}

}

const search = new Search();
search.appendSearch();

async function searchData(word) {
	const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1bf5e62d3406ea36ddc8563c7b71f2de&query=${word}`);
	const data = await response.json();
	card.getMainContainer().innerHTML = '';
	data.results.forEach(result => {
		card.appendCard(card.createCard(result.poster_path, result.vote_average, result.title, 'card__title', result.overview))
	});
}

function getContainer(container) {
	container = document.querySelector(container);
	return container;
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