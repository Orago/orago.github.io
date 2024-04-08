import Page from './components/page';

import home from './pages/home';
import missing from './pages/missing';
import socials from './pages/socials';


export default function getPage(): typeof Page {
	const curPage = new URLSearchParams(location.search);
	const pageValue = curPage.get('page');
	const paths = pageValue != null ? pageValue.split('') : location.pathname.split('/').splice(1);

	switch (paths[0]) {
		case 'socials':
			return socials;

		case 'home':
		case '':
		case null:
			return home;

		default:
			return missing;
	}
}