import Page from './components/page';

import home from './pages/home';
import missing from './pages/missing';
import socials from './pages/socials';

export default function getPage(): Page {
	const curPage = new URLSearchParams(location.search);
	const value = curPage.get('page');

	switch (value) {
		case 'socials':
			return socials;

		case 'home':
		case null:
			return home;

		default:
			return missing;
	}
}