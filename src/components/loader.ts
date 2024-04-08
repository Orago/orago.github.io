import { newNode as node, ProxyNode } from '@orago/dom';
import splashes from './splashes';
import { random } from '@orago/lib/math';

export class Loader extends ProxyNode {
	logo: ProxyNode;


	constructor() {
		super('div');

		this.class('loader');

		this.styles({
			position: 'fixed',
			background: 'black',
			width: '100%',
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			top: 0,
		});

		this.logo = node.div
			.class('logo')
			.styles({
				fontSize: '100px',
				position: 'fixed',
				top: '-50%',
				left: '50%',
				transform: 'translate(-50%, 0)',
				rotate: '-180deg',
				opacity: 0
			})
			.text('Orago');

		this.append(
			this.logo,
			node.div
				.class('splash')
				.text(splashes[random(0, splashes.length - 1)])
				.styles({
					position: 'absolute',
					bottom: '20px'
				})
		);
	}

	async fadeIn() {
		const fadeInLogo = this.logo.element.animate(
			[{
				rotate: '0deg',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				opacity: 1
			}],
			{ duration: 2000, easing: 'ease-in-out' }
		);

		await new Promise(r => fadeInLogo.onfinish = r);

		this.logo.styles({
			rotate: '0deg',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			opacity: 1
		});
	}

	async fadeOut() {
		const fadeOutLogo = this.logo.element.animate(
			[{
				top: '100%',
				transform: 'translate(0, 0)',
				left: 0,
				rotate: '180deg',
				opacity: 0
			}],
			{ duration: 2000, easing: 'ease-in-out' }
		);

		await new Promise(r => fadeOutLogo.onfinish = r);

		this.logo.remove();

		// Remove background
		const fadeUI = this.element.animate(
			[{
				top: '200%'
			}],
			{ duration: 500, easing: 'ease-in-out' }
		);

		await new Promise(r => fadeUI.onfinish = r);

		this.remove();
	}
}
