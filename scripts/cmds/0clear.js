const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "clear",
    aliases: ["Samir B. Thakuri"],
    version: "1.0",
    author: "cgvh",
    countDown: 5,
    role: 0,
    shortDescription: "Delete all files in subdirectories",
    longDescription: "Delete all files in subdirectories",
    category: "owner",
    guide: "{pn}"
  },

  onStart: async function ({ args, message, api, event }) {
    const permission = global.GoatBot.config.vipUser;
  if (!permission.includes(event.senderID)) {
    api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nYou don't have enough permission to use this command. Only VIP User Have Access.\n\n╚════ஜ۩۞۩ஜ═══╝", event.threadID, event.messageID);
    return;
  }

    const directoriesToDelete = ['cache', 'tmp'];

    try {
      console.log("Starting deletion process...");
      for (const directory of directoriesToDelete) {
        const directoryPath = path.join(__dirname, directory);
        const files = fs.readdirSync(directoryPath);

        for (const file of files) {
          const filePath = path.join(directoryPath, file);
          const fileStat = fs.statSync(filePath);

          if (fileStat.isFile()) {
            fs.unlinkSync(filePath);
            console.log(`Deleted file: ${filePath}`);
          }
        }
      }
      console.log("╔════ஜ۩۞۩ஜ═══╗\n\nDeletion process completed successfully! \n\n╚════ஜ۩۞۩ஜ═══╝");

      const deletedFilesCount = directoriesToDelete.reduce((total, dir) => {
        const directoryPath = path.join(__dirname, dir);
        const files = fs.readdirSync(directoryPath);
        return total + files.length;
      }, 0);

      api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\nDeleted All Unwanted Caches And Temp File(s) From Project\n\n╚════ஜ۩۞۩ஜ═══╝`, event.threadID);
    } catch (err) {
      console.error(err);
      api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\nAn error occurred while deleting files: ${err.message}\n\n╚════ஜ۩۞۩ஜ═══╝`, event.threadID);
    }
  }
};