const axios = require('axios');

module.exports = {
	config: {
		name: "ss",
		aliases: ["ssw"," screenshot"],
		version: "1.0",
		author: "munem",
		countDown: 5,
		role: 0,
		shortDescription: "get screenshot from an url",
		longDescription: "get screenshot from an url",
		category: "information",
		guide: { en:"{pn} [ link | query ]" },
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ");
		let url = "";
		if (!name) {
			return message.reply(`⚠️ | Please enter an url or search query!`);
		} else {
			try {
				new URL(name);
				url = name;
			} catch (err) {
				url = `https://www.google.com/search?q=${encodeURIComponent(name)}`;
			}
			const BASE_URL = `https://api.tantrik-apis.repl.co/screenshot?url=${encodeURIComponent(url)}&apikey=8kkmMgb5knwHjALe`;
			try {
				const form = {
          body: ``
        };
        form.attachment = []
        form.attachment[0] = await global.utils.getStreamFromURL(BASE_URL);
        message.reply(form); 
			} catch (e) { 
				message.reply(`error`);
			}
		}
	}
};