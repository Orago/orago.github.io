import { newNode as node } from '@orago/dom';
import { Loader } from './components/loader';
import getPage from './getPage';
import { mainNode } from './sharedUtil';

async function runPage() {
	const page = new (getPage());
	const loader = new Loader();

	page.load();

	mainNode.append(
		loader
	);

	await loader.fadeIn(page.colors.background, page.colors.foreground);
	await new Promise(r => setTimeout(r, 1000));
	loader.fadeOut();

	mainNode.append(
		page,

		node.div
			.styles({
				position: 'absolute',
				top: '10px',
				right: '10px',
				background: 'var(--color-foreground)',
				padding: '10px',
				borderRadius: '50%',
				fontSize: '26px',
				cursor: 'pointer'
			})
			.text('🔗')
			.on('click', () => location.href = '?page=directory')
	);
}

runPage();