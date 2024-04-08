import { newNode as node } from '@orago/dom';
import Page from '../components/page';
import { ProjectNode, TempImageProjectNode } from '../components/project';

export const ProjectList = [
	new ProjectNode(
		'Meown',
		`Meown is a bla bla bla bla 
		bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bl
		a bla bla bla bla bla bla bla bla bla bla bla 
		bla bla bla`,
		{
			link: {
				click: 'https://meown.net'
			}
		}
	),
	new TempImageProjectNode('assets/istorik-dancing-cat.gif')
];

export default class ProjectsPage extends Page {
	load() {
		this.styles({
			padding: '5px'
		});

		this.setColors('#0a202b', '#f87b4c');

		this.append(
			node.h2
				.class('title-header')
				.text('Projects'),
			node.div
				.class('project-card-container')
				.append(ProjectList),

			node.hr,
			node.div
				.class('links')
				.append(
					node.a
						.text('Discord')
						.attr({ href: 'https://discord.gg/T6tNfcY3Jg' }),


					node.a
						.text('Youtube')
						.attr({ href: 'https://discord.gg/T6tNfcY3Jg' })
				)
		);
	}
}