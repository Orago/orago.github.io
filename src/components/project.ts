import { newNode as node, ProxyNode } from '@orago/dom';

interface ProjectNodeExtras {
	link?: {
		text?: string,
		click: string | Function
	};
}

export class ProjectNode extends ProxyNode {
	constructor(title: string, description: string, extras?: ProjectNodeExtras) {
		super('div');

		this.class('project-card');

		this.append(
			node.h2.class('title').text(title),
			node.div.class('description').text(description),

			extras?.link != null &&
			node.div
				.class('link-container')
				.append(
					node.div
						.class('link')
						.text(extras.link?.text ?? 'View' + ' >')
						.ref(link => {
							if (extras.link != null) {
								const { click } = extras.link;

								if (typeof click === 'string') {
									// link.attr({ href: extras.link.click });
									link.on('click', () => location.href = click);
								} else {
									link.on('click', click);
								}
							}
						})
				)
		);
	}
}