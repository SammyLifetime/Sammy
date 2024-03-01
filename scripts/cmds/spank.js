const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
	config: {
		name: "Spank",
		version: "1.1",
		author: "milan-says",
		countDown: 5,
		role: 0,
		shortDescription: " Ø¬Ù„Ø¯ Ø´Ø®Øµ",
		longDescription: "Ø¬Ù„Ø¯ Ø´Ø­Øµ ",
		category: "ØµÙˆØ±",
		guide: {
			vi: "{pn} [@tag | blank]",
			en: "{pn} [@tag]"
		}
	},

	onStart: async function ({ event, message, usersData }) {
 const uid = event.senderID;
 const uid1 = Object.keys(event.mentions)[0]
 if(!uid1) return message.reply("Ø³ÙˆÙŠ ØªØ§Øº ðŸ˜ ")
		const avatarURL = await usersData.getAvatarUrl(uid);
		const avatarURL2 = await usersData.getAvatarUrl(uid1);
		const img = await new DIG.Spank().getImage(avatarURL,avatarURL2);
 const pathSave = `${__dirname}/tmp/${uid}_Spank.png`;
		fs.writeFileSync(pathSave, Buffer.from(img));
		message.reply({
			attachment: fs.createReadStream(pathSave)
		}, () => fs.unlinkSync(pathSave));
	}
};