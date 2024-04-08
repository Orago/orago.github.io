	import { ProxyNode } from '@orago/dom';
	import { bodyNode } from '../sharedUtil';

export default class Page extends ProxyNode {
	colors = {
		background: 'black',
		foreground: 'white'
	};

	constructor (){
		super('div');
	}

	setColors (background: string, foreground: string){
		this.colors.background = background;
		this.colors.foreground = foreground;

		bodyNode.styles({
			props: {
				'color-background': background,
				'color-foreground': foreground
			}
		});

		return this;
	}
}