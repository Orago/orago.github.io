import { newNode as node } from '@orago/dom';
import Page from '../components/page';

export default new Page()
	.styles({
		padding: '5px'
	})
	.append(
		node.h1.text('Page not found')
	);