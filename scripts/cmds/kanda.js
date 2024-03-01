const axios = require('axios');

module.exports = {
	config: {
		name: "kanda",
		aliases: ["porn", "xxx"],
		version: "1.0",
		author: "Samir B. Thakuri",
		countDown: 5,
		role: 2,
		shortDescription: "get nepali kanda",
		longDescription: "get nepali kanda videos",
		category: "adult",
		guide: "{pn}"
	},

	onStart: async function ({ message, args }) {
			const BASE_URL = `https://samirthakuri.restfulapi.repl.co/kanda/apikey=notsopreety`;
 message.reply("Loading The Video Please Wait UpTo 1 Minutes⌛"); 
			try {
				let res = await axios.get(BASE_URL)
				let kanda = res.data.url;
				const form = {
					body: `Look At This 🥵`
				};
		 if (kanda)
					form.attachment = await global.utils.getStreamFromURL(kanda);
				message.reply(form); 
			} catch (e) { message.reply(`Sorry, I Can't Process Your Request`)
 console.log(e);
 }

		}
	};