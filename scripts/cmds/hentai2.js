const axios = require('axios');

module.exports = {
	config: {
		name: "hentai2",
		aliases: ["hen2"],
		version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 0,
		shortDescription: "Anime Hentai",
		longDescription: "Get Anime Hentai.",
		category: "adult",
		guide: "{p} hentai2"
	},

	onStart: async function ({ message, args }) {
    const permission = ["100088353639740"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage ("╔════ஜ۩۞۩ஜ═══╗\n\nOnly King Monsterwith has permission to use this cmd.\n\n╚════ஜ۩۞۩ஜ═══╝", event.threadID, event.messageID);
    return;
  }
			const BASE_URL = `https://api.zahwazein.xyz/downloader/hentaivid?apikey=zenzkey_92d341a7630e`;
 message.reply("processing your request."); 
			try {
				let res = await axios.get(BASE_URL)
				let porn = res.data.result.video_1;
				const form = {
					body: ``
				};
		 if (porn)
					form.attachment = await global.utils.getStreamFromURL(porn);
				message.reply(form); 
			} catch (e) { message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\nAn Error Occured While Processing Your Request.\n\n╚════ஜ۩۞۩ஜ═══╝`)
 console.log(e);
 }

		}
	};