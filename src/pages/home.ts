import { newNode as node } from '@orago/dom';
import { ProjectList } from '../projects';
import Page from '../components/page';

export default new Page()
.styles({
	padding: '5px'
})
.setColors('#F08A4B', '#B05A24')
.append(
	node.h2.text('Projects'),
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