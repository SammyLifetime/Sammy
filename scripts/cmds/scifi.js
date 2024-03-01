const axios = require("axios");

module.exports = {
config: {
		name: "scifi",
    version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 0,
		shortDescription: "scifi text edit Through textpro.me",
		longDescription: "scifi text edit Through textpro.me",
		category: "textpro",
		guide: {
      en: "{p}{n} query",
    }
	},

 onStart: async function ({ api, event, args, message }) {
 try { 
 const samir = args.join(' ');
 const response = `https://api.zahwazein.xyz/textpro/3dscifi?text=${samir}&apikey=zenzkey_92d341a7630e`;

 const form = {
      body: `Here's Your Request.. `
    };
    form.attachment = [];
    form.attachment[0] = await global.utils.getStreamFromURL(response);
    message.reply(form);
 } catch (error) {
 console.error(error);
 message.reply("An error occurred while fetching response");
 }
 }
};