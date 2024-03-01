module.exports = {
config: {
		name: "demote",
    aliases:["removeadmin", ],
    version: "1.0",
		author: "Samir B. Thakuri| Samuel Kâñèñgeè",
		countDown: 5,
		role: 1,
		shortDescription: "remove group admin",
		longDescription: "remove admin the person you need to remove admin from the group by tagging",
		category: "box chat",
		guide: {
      en: "{p}{n} [tag]",
    }
	},

 onStart: async function ({ api, event }) {
	var mention = Object.keys(event.mentions);
	return api.getThreadInfo(event.threadID, (err, info) => {
		if (err) return api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nAn error occurred!\n\n╚════ஜ۩۞۩ஜ═══╝",event.threadID);
if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('╔════ஜ۩۞۩ஜ═══╗\n\nNeed group admin permission\nPlease add and try again!\n\n╚════ஜ۩۞۩ஜ═══╝', event.threadID, event.messageID);
if(!mention[0]) return api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nYou must tag the person you want to demote from  admin.\n\n╚════ஜ۩۞۩ஜ═══╝",event.threadID);
		if (info.adminIDs.some(item => item.id == event.senderID)) {
			for (let o in mention) {
				setTimeout(() => {				api.changeAdminStatus(event.threadID,mention[o],false,) 
				},3000)
			}
		}
	})
}
};