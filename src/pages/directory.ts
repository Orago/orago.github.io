import { newNode as node, ProxyNode } from '@orago/dom';
import Page from '../components/page';

const links: Array<[string, string]> = [
	['home', '/'],
	['projects', '/?page=projects'],
	['socials', '/?page=socials'],
];

class LinkButton extends ProxyNode {
	constructor(
		name: string,

		url: string
	) {
		super('a');

		this.text(name);
		this.attr({ href: url });
		this.styles({
			color: 'white',
			flex: '1 1',
			borderRadius: '5px',
			margin: '5px',
			padding: '10px',
			fontSize: '20px',
			textDecoration: 'none',

			/* Custom */
			background: 'cornflowerblue'
		});
	}
}

export default class extends Page {
	load() {
		this.setColors('#38568d', 'cornflowerblue');
		this.styles({
			padding: '5px'
		});
		this.append(
			node.h2
				.class('title-header')
				.text('Directory'),

			node.div
				.styles({
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap'
				})
				.append(
					links.map(([name, options]) => {
						return new LinkButton(name, options);
					}),
				)
		);
	}
}
