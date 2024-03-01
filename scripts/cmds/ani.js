const axios = require('axios');

module.exports = {
	config: {
		name: "ani",
		aliases: ["anim", "Ani"],
		version: "1.0",
		author: "Samuel Kâñèñgeè",
		countDown: 5,
		role: 0,
		shortDescription: "get random waifu",
		longDescription: "",
		category: "anime",
		guide: "{pn} {{<name>}}"
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ");
		if (!name)

			try {
				let res = await axios.get(`https://api.waifu.pics/sfw/waifu`)


				let res2 = res.data
				let img = res2.url

				const form = {
					body: `  ╔════ஜ۩۞۩ஜ═══╗\n 「 𝔀𝓪𝓲𝓯𝓾 」\n╚════ஜ۩۞۩ஜ═══╝   `

				};
				if (img)
					form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(form);
			} catch (e) {
				message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n🥺 Not Found\n\n╚════ஜ۩۞۩ஜ═══╝`)
			}


		else {

			try {
				let res = await axios.get(`https://api.waifu.pics/sfw/${name}`)


				let res2 = res.data
				let img1 = res2.url

				const form = {
					body: `   「 𝔀𝓪𝓲𝓯𝓾  」   `

				};
				if (img1)
					form.attachment = await global.utils.getStreamFromURL(img1);
				message.reply(form);
			} catch (e) { message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n═🥺 No waifu 🥲═\n CATEGORY:\n\n❍ waifu, \n❍ neko, ❍ shinobu,\n❍ megumin, ❍ bully, ❍ cuddle,\n❍  cry, ❍ kiss,❍ lick,\n❍ hug,❍ awoo, pat,\n❍  smug,❍  bonk, ❍ yeet, \n❍ blush,❍  smile, ❍ wave,\n❍ highfive, ❍ handhold,❍  nom,\n❍ bite,❍  glomp, slap,\n❍ kill, ❍ kick,\n❍ happy,\n❍ wink,❍ poke, ❍ dance,\n❍ cringe \n\n╚════ஜ۩۞۩ஜ═══╝`) }

		}
	}
}