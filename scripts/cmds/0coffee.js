const fs = require("fs-extra");
const { utils } = global;

module.exports = {
	config: {
		name: "coffee",
		version: "1.3",
		author: "LiANE",
		countDown: 0,
		role: 2,
		shortDescription: "Coffee ☕",
		longDescription: "Coffee ☕",
		category: "misc",
		guide: {
			en: "{pn} - Coffee Message"
		}
	},

	langs: {
		en: {
			myCoffee: "Hello, I'm here! 🥰☕\n🌐 System prefix: %1\n🛸 Your box chat prefix: %2"
		}
	},

	onStart: async function ({ usersData, message, role, args, commandName, event, threadsData, getLang }) {
const user = await usersData.get(event.senderID);
const userName = user.name;
const userMoney = user.money;
message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n☕ | Hello ${userName}! Here's a free coffee for you! And also a free 200💵\n\n╚════ஜ۩۞۩ஜ═══╝`);
await usersData.set(event.senderID, {
money: userMoney + 200 });
},

onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "coffee")
			return () => {
				return message.reply(getLang("myCoffee", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)));
			};
	}
};