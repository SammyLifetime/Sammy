const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
module.exports = {
	config: {
		name: "hub",
		aliases: ["hub"],
		version: "1.0",
		author: "MILAN",
		countDown: 5,
		role: 0,
		shortDescription: "hub tetx",
		longDescription: "",
		category: "write",
		guide: {
			vi: "{pn} text | text",
			en: "{pn} text | text"
		}
	},

	onStart: async function ({ message, api, event, args }) {
        
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	 const { threadID, messageID, senderID, body } = event;
  let name = (await api.getUserInfo(senderID))[senderID].name
	let text = args.join(" ");
  const text1 = text.substr(0, text.indexOf("|")); 
  const length = parseInt(text1.length)
  const text2 = text.split("|").pop()
  const length_2 = parseInt(text2.length)
	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/assets/any.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/assets/any.png"),event.messageID);
	 return request(encodeURI(`https://api.zahwazein.xyz/textpro/pornhub?text=${text1}&text2=${text2}&apikey=zenzkey_a08241ea6756`)).pipe(fs.createWriteStream(__dirname+'/assets/any.png')).on('close',() => callback());     
} 
}