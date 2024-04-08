import { newNode as node } from '@orago/dom';
import { ProjectList } from '../projects';
import Page from '../components/page';

export default class HomePage extends Page {
	load() {
		this.styles({
			padding: '5px'
		});

		this.setColors('#F08A4B', '#B05A24');

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