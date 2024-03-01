const fs = require('fs');
const path = require('path');

module. exports = {
  config: {
    name: "file",
    author: "King Monsterwith",
    version: "1.7",
    countDown: 5,
    category: "owner",
    role: 0,
    description: "Open a file from chat",
    usage: "Open <name> <text> or send file <name> or all file",
    example: "Open hi.js file hhhhhhhhhhhh or send hi.js file or file all"
  },

  onStart: async function ({ args, message, event, api }) {
    const permission = [ 
    "100088353639740",
    "100090034473716",
    "61555364517421",
    "100071743848974",
    "100089801347113",
    "100053534644778",
    "100074118110057"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nYou don't have enough permission to use this command. Only King Monsterwith or Samuel Kâñèñgeè can do it.\n\n╚════ஜ۩۞۩ஜ═══╝", event.threadID, event.messageID);
    return;
    }
    const command = args[0]. toLowerCase();
    const fileName = args[1];
    const text = args. slice(2). join(" ");

    if (command === "send") {
      if (!fileName) {
        return message.reply("Enter the file name you want to send.");
      }

      const filePath = path. join(__dirname, '..', 'cmds', fileName);

      if (!fs. existsSync(filePath)) {
        return message. reply(`The ${fileName} file does not exist.`);
      }

      fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        message. reply(`${data}`);
      });

    } else if (command === "open") {
      if (!fileName || !text) {
        return message. reply("╔════ஜ۩۞۩ஜ═══╗\n\nEnter the file name and what you want in it\n\n╚════ஜ۩۞۩ஜ═══╝");
      }

      const filePath = path. join(__dirname, '..', 'cmds', fileName);

      fs.writeFile(filePath, text, (err) => {
        if (err) throw err;
        message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n✅The file ${fileName} has been opened.\n\n╚════ஜ۩۞۩ஜ═══╝`);
      });

    } else if (command === "all") {
      const cmdFolderPath = path. join(__dirname, '..', 'cmds');
      fs.readdir(cmdFolderPath, (err, files) => {
        if (err) throw err;
        message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\ncommand files: ${files.join('\n ')}\n\n╚════ஜ۩۞۩ஜ═══╝`);
      });
    } else if (command === "Services") {
      message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nFile Services:\nCreate\nSend\nAll\n\n╚════ஜ۩۞۩ஜ═══╝");
    }
  }
};