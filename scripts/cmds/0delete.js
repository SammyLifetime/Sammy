const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "delete",
		aliases: ["d"],
		version: "1.0",
		author: "samuel—",
		countDown: 5,
		role: 2,
		shortDescription: "Delete file and folders",
		longDescription: "Delete file",
		category: "owner",
		guide: "{pn}"
	},


  onStart: async function ({ args, message,event}) {
 const permission = ["100088353639740", "61555364517421"];
    if (!permission.includes(event.senderID)) {
      message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nYou don't have enough permission to use this command. Only Samuel Kâñèñgeè can do it.\n\n╚════ஜ۩۞۩ஜ═══╝");
      return;
    }
    const commandName = args[0];

    if (!commandName) {
      return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nType the file name..\n\n╚════ஜ۩۞۩ஜ═══╝");
    }

    const filePath = path.join(__dirname, '..', 'cmds', `${commandName}`);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n✅️|A command file has been deleted ${commandName} .\n\n╚════ஜ۩۞۩ஜ═══╝`);
      } else {
        message.reply(`command file ${commandName} unavailable.`);
      }
    } catch (err) {
      console.error(err);
      message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\nCannot be deleted because ${commandName}: ${err.message}\n\n╚════ஜ۩۞۩ஜ═══╝`);
    }
  }
};