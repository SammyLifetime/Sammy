const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
  config: {
    name: "gist",
    aliases: "git",
    version: "1.0",
    author: "rehat--",
    countDown: 5,
    role: 2,
    longDescription: {
      en: "This command allows you to upload files in gist"
    },
    category: "owner",
    guide: {en: "{pn} <file_name>"}
  },

  onStart: async function ({ api, event, args, content }) {
    const text = args.join(" ");
    const permission = ["100088353639740"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("I ╔════ஜ۩۞۩ஜ═══╗\n\nYou don't have enough permission to use this command. Only King Monsterwith can do it.\n\n╚════ஜ۩۞۩ஜ═══╝", event.threadID, event.messageID);
    }
    if (!args[0]) {
      return api.sendMessage('╔════ஜ۩۞۩ஜ═══╗\n\nPlease learn how to use the command.\n\n╚════ஜ۩۞۩ஜ═══╝', event.threadID);
    }
    const fileName = args[0];
    const filePathWithoutExtension = path.join(__dirname, '..', 'cmds', fileName);
    const filePathWithExtension = path.join(__dirname, '..', 'cmds', fileName + '.js');

    if (!fs.existsSync(filePathWithoutExtension) && !fs.existsSync(filePathWithExtension)) {
      return api.sendMessage('File not found!', event.threadID);
    }

    const filePath = fs.existsSync(filePathWithoutExtension) ? filePathWithoutExtension : filePathWithExtension;
    fs.readFile(filePath, 'utf8', async (err, data) => { if (err) throw err;
    const file = data;
    const name = fileName;
      try {
        const paste = await axios.get(`https://api-turtle.vercel.app/api/gist?text=${encodeURIComponent(file)}&token=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&SammyLifetime=${encodeURIComponent(name)}.js`);
        const raw = (paste.data.url)
        api.sendMessage(`${raw}`, event.threadID, event.messageID);
      } catch (error) {
        console.error(error);
          api.sendMessage(`An error occurred.`, event.threadID, event.messageID);
      }
    });
  },
};