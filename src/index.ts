import { newNode as node, ProxyNode, qs } from '@orago/dom';
import { Loader } from './components/loader';
import { ProjectNode } from './components/project';
import { ProjectList } from './projects';

const mainNode: ProxyNode = qs('#main') as ProxyNode;

async function runPage() {
	const loader = new Loader();

	mainNode.append(
		loader
	);

	await loader.fadeIn();
	await new Promise(r => setTimeout(r, 1000));
	await loader.fadeOut();

	mainNode.append(
		node.h2.text('Projects'),
		node.div
			.class('project-card-container')
			.append(ProjectList)
	);
}

runPage();