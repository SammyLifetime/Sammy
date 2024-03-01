const axios = require('axios');

module.exports = {
	config: {
		name: "pooh",
		aliases: ["pooh"],
		version: "1.0",
		author: "MILAN",
		countDown: 5,
		role: 0,
		shortDescription: "write something",
		longDescription: "",
		category: "write",
		guide:  {
			vi: "{pn} text | text",
			en: "{pn} text | text"
		}
	},

	onStart: async function ({ message, args, api , event }) {
const axios = require('axios'); 
const fs = require('fs-extra');
const request = require('request');
	 const { threadID, messageID, senderID, body } = event;
  let name = (await api.getUserInfo(senderID))[senderID].name
	let text = args.join(" ");
  const text1 = text.substr(0, text.indexOf(' | ')); 
  const length = parseInt(text1.length)
  const text2 = text.split(" | ").pop()
  const length_2 = parseInt(text2.length)
	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/assets/any.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/assets/any.png"),event.messageID);
	 return request(encodeURI(`https://api.popcat.xyz/pooh?text1=${text1}&text2=${text2}`)).pipe(fs.createWriteStream(__dirname+'/assets/any.png')).on('close',() => callback());     
} 
};