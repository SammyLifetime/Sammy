const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "del",
    aliases: ["kill"],
    version: "1.0",
    author: "samuel—& fixed by samir.",
    countDown: 5,
    role: 0,
    shortDescription: "Delete file and folders",
    longDescription: "Delete file",
    category: "owner",
    guide: "{pn}"
  },

  onStart: async function ({ args, message, api }) {
    const permission = ["100008578069233"];
    if (!permission.includes(message.senderID)) {
      api.sendMessage(
        "You don't have enough permission to use this command. Only Samir B. Thakuri can do it.",
        message.threadID,
        message.messageID
      );
      return;
    }

    const commandName = args[0];

    if (!commandName) {
      return message.reply("Use the command and enter the command file name");
    }

    const filePath = path.join(__dirname, '..', 'cmds', commandName);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        message.reply(`A command file ${commandName} has been deleted.`);
      } else {
        message.reply(`Command file ${commandName} is unavailable.`);
      }
    } catch (err) {
      console.error(err);
      message.reply(`Cannot delete the command file ${commandName}: ${err.message}`);
    }
  }
};
