const fs = require("fs-extra");

module.exports = {
	config: {
		name: "delmsg", 
		aliases: ["delmsg"], 
		version: "1.0.1", 
		author: "Samuel Kâñèñgeè", 
		countDown: 5,
		role: 0,
		shortDescription: "Delete message", 
		longDescription: "Delete all message from bot ACC", 
		category: "owner", 
		guide: "{pn} delmsg"
		
	}, 

	onStart: async function ({ api, event, args, getText }) {
if (args[0] == "all") {
 return api.getThreadList(1000, null, ["INBOX"], (err, list) => {
 	if (err) throw err;
 	list.forEach(item => (item.threadID != event.threadID) ? api.deleteThread(item.threadID) : "");
 	api.sendMessage("Successfully erase all messages", event.threadID)
 })
}
else return api.getThreadList(100, null, ["INBOX"], (err, list) => {
 	if (err) throw err;
 	list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.deleteThread(item.threadID) : "");
 	api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nSuccessfully erase all group messages\n\n╚════ஜ۩۞۩ஜ═══╝", event.threadID)
 })
		}
	   
	};