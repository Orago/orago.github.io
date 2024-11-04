(() => {
	async function doSpotifyBS() {
		/** @type {HTMLElement} */
		const parentNode = document.querySelector('#spotify');
		/** @type {HTMLElement} */
		const textNode = document.querySelector('#spotify-text');
		const got = await fetch('https://orago-spotify.glitch.me/current');

		parentNode.style.display = 'inherit';
		textNode.innerText = 'Loading..';

		if (got.status == 200) {
			const parsed = await got.json();

			if (parsed.error != null) {
				parentNode.style.display = 'none';
				return;
			}

			const artists = parsed.item.artists.map(a => a.name).join(', ');

			textNode.innerText = parsed.item.name + ' by ' + artists;
		}
		else {
			textNode.innerText = 'Failed to load spotify..';
		}
	}

	window.doSpotify = doSpotifyBS;
})();