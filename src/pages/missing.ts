import { newNode as node } from '@orago/dom';
import Page from '../components/page';

export default class MissingPage extends Page {
	load() {
		this
			.styles({
				padding: '5px'
			})
			.append(
				node.h1.text('Page not found')
			);
	}
}