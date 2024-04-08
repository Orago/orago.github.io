import { newNode as node } from '@orago/dom';
import Page from '../components/page';

const socials = {
	Discord: {
		url: "https://discord.gg/ytBtmHJjmE",
		background: "#738adb"
	},
	Youtube: {
		url: "https://www.youtube.com/channel/UCbVQOO0xb57ja74eLJQJ3Kg",
		background: "#ff0000"
	},
	Twitch: {
		url: "https://www.twitch.tv/oragocat",
		background: "#6441a5"
	},
	Twitter: {
		url: "https://twitter.com/OragoMosh",
		background: "#1DA1F2"
	},
	Reddit: {
		url: "https://www.reddit.com/user/Orago51",
		background: "#FF4301"
	},
	Instagram: {
		url: "https://www.instagram.com/oragocat/",
		background: "#405DE6"
	},
	Minecraft: {
		url: "https://namemc.com/profile/9d9380ad-ccda-46e2-9fef-04e4541be0e1",
		background: "#40ae33"
	}
};


export default new Page()
	.styles({
		padding: '5px'
	})
	.append(
		node.h2.text('Socials'),

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