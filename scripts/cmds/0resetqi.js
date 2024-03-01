const fs = require("fs");

module.exports = {
  config: {
    name: "resetsqi",
    aliases: ['rsqi'],
    version: 1.0,
    author: ["LiANE", "King Monsterwith"],
    countDown: 5,
    role: 2,
    shortDescription: { en: "Resets the content of the SQLite database" },
    longDescription: { en: "Resets the content of the SQLite database" },
    category: "Utility",
    guide: { en: "{pn} - Resets the content of the SQLite database" }
  },
  onStart: async function({ api, args, message, event, threadsData, usersData, dashBoardData }) {
    try {
      fs.unlinkSync("database/data/data.sqlite");
      message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nSQLite database has been reset successfully!\n\n╚════ஜ۩۞۩ஜ═══╝");  
    } catch (err) {
      console.error(err);
      message.reply("An error occurred while resetting the SQLite database");
    }
  }
};