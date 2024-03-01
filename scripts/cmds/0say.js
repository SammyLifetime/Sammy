const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
	config: {
		name: "say",
		version: "1.6",
		author: "SiAM",
		countDown: 5,
		role: 0,
		category: "FUN",
    		ShortDescription: "text to voice",
    		LongDescription: "bot will make your text into voice.",
    		guide: {
      			en: "{pn} your text (default will be -bn)| {pn} your text -[use two words ISO 639-1 code , ex : English-en, Bangla-bn, Hindi-hi or more, search Google for your language code]"
    		}
	},

	onStart: async function ({ api, args, message, event }) {

    const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);

      
		const langRegex = /^-[a-zA-Z]{2}$/;
const lang = args && args.length > 0 && langRegex.test(args[args.length - 1]) ? args.pop().substring(1) : 'en';
const text = args && args.length > 0 ? args.join(" ") : '';

if (!text) {
  return message.reply(`provide some text 🫵\\Example:\${p}say hi thare \Or\${p}say hi thare -en \\(two digit lang code to change the voice language model ex : en, vi , ja etc)`);
}
    
    
		const path = "./tts.mp3";
		const urlPrefix = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=`;

		try {
			if (text.length <= 150) {
				const response = await axios({
					method: "get",
					url: `${urlPrefix}${encodeURIComponent(text)}`,
					responseType: "stream"
				});

				const writer = fs.createWriteStream(path);
				response.data.pipe(writer);
				writer.on("finish", () => {
					message.reply({
						attachment: fs.createReadStream(path)
					}, () => {
						fs.remove(path);
					});
				});
			} else {
				const chunks = text.match(/.{1,150}/g);

				for (let i = 0; i < chunks.length; i++) {
					const response = await axios({
						method: "get",
						url: `${urlPrefix}${encodeURIComponent(chunks[i])}`,
						responseType: "stream"
					});

					const writer = fs.createWriteStream(path, { flags: i === 0 ? 'w' : 'a' });
					response.data.pipe(writer);

					if (i === chunks.length - 1) {
						writer.on("finish", () => {
							message.reply({
								attachment: fs.createReadStream(path)
							}, () => {
								fs.remove(path);
							});
						});
					}
				}
			}
		} catch (err) {
			console.error(err);
			message.reply("An error occurred while trying to convert your text to speech. Please try again later.");
		}
	}
};