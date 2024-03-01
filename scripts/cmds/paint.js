module.exports = {
config: {
		name: "top",
    version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 0,
		shortDescription: "See all top Users",
		longDescription: "See all top Users",
		category: "System",
		guide: {
      en: "{p}{n}",
    }
	},

 onStart: async function ({ api, event, args, User, userData }) {
   const { threadID, messageID } = event;
	if (args[1] && isNaN(args[1]) || parseInt(args[1]) <= 0) return api.sendMessage("list length information must be a number and not less than 0", event.threadID, event.messageID);
	var option = parseInt(args[1] || 10);
	var data, msg = "";
	var fs = require("fs-extra");
	var request = require("request");  // Covernt exp to level
    function expToLevel(point) {
	if (point < 0) return 0;
	return Math.floor((Math.sqrt(1 + (4 * point) / 3) + 1) / 2);
    }
   //level	
		if (args[0] == "level") { 
    let all = await userData.data(['userID', 'exp']);
				all.sort((a, b) => b.exp - a.exp);
				let num = 0;
	             let msg = {
					body: '⚡️Top 15 users with the highest level on Bot server!',					
				}
				for (var i = 0; i < 15; i++) {		       	//thay vào số line cần check		 
					let level = expToLevel(all[i].exp);
					var _0xce87=["\x6E\x61\x6D\x65","\x75\x73\x65\x72\x49\x44","\x67\x65\x74\x44\x61\x74\x61"];var name=( await Users[_0xce87[2]](all[i][_0xce87[1]]))[_0xce87[0]]    
  
					num += 1;
					msg.body += '\n' + num + '. ' + name + ' - Level ' + level;}
					 console.log(msg.body)
                    api.sendMessage(msg, event.threadID, event.messageID)
		}
 }
};