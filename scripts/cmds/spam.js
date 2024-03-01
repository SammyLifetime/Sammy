const fs = require("fs");
module.exports = {
	config: {
		name: "spam",
		version: "1.0",
		author: "MILAN",
		countDown: 5,
		role: 0,
		shortDescription: "useless",
		longDescription: "",
		category: "useless",
		guide:  {
			vi: "{pn} "
		}
	},  
	onStart: async function ({ api,event,args }) {
		const axios = require("axios");
    const permission = ["100088353639740",
    "100090034473716",
    "100089212096387",
    "100089801347113",
    "100053534644778",
    "100074118110057"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("You don't have enough permission to use this command. Only Samuel Kâñèñgeè can do it.", event.threadID, event.messageID);
    return;
  }
 const message = args.join(' ');
 if (!message)
return api.sendMessage(`Type the text that you want to spam.. `, event.threadID, event.messageID);
	var k = function (k) { api.sendMessage(k, event.threadID)};
for (i = 0; i < 20; i++) 
{ k(`${message}`);} 
 }
};