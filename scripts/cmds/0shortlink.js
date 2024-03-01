const axios = require('axios');

module.exports = {
	config: {
		name: "shortlink",
		version: "1.0",
		author: "Samuel Kâñèñgeè",
		countDown: 5,
		role: 0,
		shortDescription: "",
		longDescription: "",
		category: "owner",
		guide: "{pn}"
	},
	onStart: async function ({ api, event, args }) {
		let juswa = args.join(" ");
		try {
			const res = await axios.get(`https://manhict.tech/shortlink?url=${juswa}`);
			const created_at = res.data.created_at;
			const link = res.data.link;
			const long_url = res.data.long_url;
			const id = res.data.id;
			api.sendMessage(`Created at:${created_at}\n\nShort url:\n${link}\nShorter url: ${id}\n\nOriginal url:\n${long_url}`, event.threadID, event.messageID);
		} catch (error) {
			console.error(error);
			api.sendMessage(`An error occurred while generating the short URL. Please try again.`, event.threadID, event.messageID);
		}
	}
};