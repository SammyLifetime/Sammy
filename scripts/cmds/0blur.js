
const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
	config: {
		name: "blur",
		version: "1.1",
		author: "Samuel Kâñèñgeè",
		countDown: 5,
		role: 0,
		shortDescription: "blur image",
		longDescription: "blur image",
		category: "image",
		guide: {
			vi: "{pn} [@tag | blank]",
			en: "{pn} [@tag]"
		}
	},

	onStart: async function ({ event, message, usersData }) {
 const uid = Object.keys(event.mentions)[0]
 if(!uid) return message.reply("please mention someone")
		const avatarURL = await usersData.getAvatarUrl(uid);
		const img = await new DIG.Blur().getImage(avatarURL);
 const pathSave = `${__dirname}/tmp/${uid}_Blur.png`;
		fs.writeFileSync(pathSave, Buffer.from(img));
		message.reply({
			attachment: fs.createReadStream(pathSave)
		}, () => fs.unlinkSync(pathSave));
	}
};