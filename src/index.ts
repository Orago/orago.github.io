import { Loader } from './components/loader';
import getPage from './getPage';
import { mainNode } from './sharedUtil';

async function runPage() {
	const page = getPage();
	const loader = new Loader();

	mainNode.append(
		loader
	);

	await loader.fadeIn(page.colors.background, page.colors.foreground);
	await new Promise(r => setTimeout(r, 1000));
	loader.fadeOut();

	mainNode.append(
		page
	);
}

runPage();