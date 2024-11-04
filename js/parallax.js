// const imageCache = new Map();
function imageF(url) {
	const res = new Image();
	res.crossOrigin = 'anonymous';
	res.src = url;
	return res;
}

function renderMultipleBackgrounds(
	{ brush },
	backgrounds,
	frame
) {

}

class ParallaxThing {
	canvas = document.createElement('canvas');
	constructor() {


		const continueLoop = () => {
			this.loop();
			requestAnimationFrame(continueLoop);
		}
	}

	loop() {
		const dimensions = brush.dimensions();

		for (let [sprite] of backgrounds) {
			const scale = dimensions.height / sprite.height;
			const w = sprite.width * scale;
			const h = sprite.height * scale;
			const left = (frame % w);

			for (
				let x = left - (left % w > 0 ? w : 0);
				x < brush.width;
				x += w
			) {
				brush.image(
					sprite,
					undefined,
					[
						x,
						0,
						w + 1,
						h
					]
				);
			}
		}
	}
}