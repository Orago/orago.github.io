import { newNode as node } from '@orago/dom';
import Page from '../components/page';

export default class MissingPage extends Page {
	load() {
		this.setColors('#D8D7D5', '#9ea3ab');

		this
			.styles({
				padding: '5px'
			})
			.append(
				node.h1.text('404 Page not found')
			);
	}
}