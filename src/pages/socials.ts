import { newNode as node, ProxyNode } from '@orago/dom';
import Page from '../components/page';

const socials: Array<[string, { url: string, background: string }]> = [
	['Discord', {
		url: 'https://discord.gg/ytBtmHJjmE',
		background: '#738adb'
	}],
	['Youtube', {
		url: 'https://www.youtube.com/channel/UCbVQOO0xb57ja74eLJQJ3Kg',
		background: '#ff0000'
	}],
	['Twitch', {
		url: 'https://www.twitch.tv/oragocat',
		background: '#6441a5'
	}],
	['Twitter', {
		url: 'https://twitter.com/OragoMosh',
		background: '#1DA1F2'
	}],
	['Reddit', {
		url: 'https://www.reddit.com/user/Orago51',
		background: '#FF4301'
	}],
	['Instagram', {
		url: 'https://www.instagram.com/oragocat/',
		background: '#405DE6'
	}],
	['Minecraft', {
		url: 'https://namemc.com/profile/9d9380ad-ccda-46e2-9fef-04e4541be0e1',
		background: '#40ae33'
	}]
];

class SocialButton extends ProxyNode {
	constructor(
		name: string,

		options: {
			url: string;
			background: string
		}
	) {
		super('a');

		this.text(name);
		this.attr({ href: options.url });
		this.styles({
			color: 'white',
			flex: '1 1',
			borderRadius: '5px',
			margin: '5px',
			padding: '10px',
			fontSize: '20px',
			textDecoration: 'none',

			/* Custom */
			background: options.background
		});
	}
}

export default class extends Page {
	load() {
		this.setColors('#EEAB53', '#DA7C01');
		this.styles({
			padding: '5px'
		});
		this.append(
			node.h2
				.class('title-header')
				.text('Socials'),

			node.div
				.styles({
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap'
				})
				.append(
					socials.map(([name, options]) => {
						return new SocialButton(name, options);
					}),
				),

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
