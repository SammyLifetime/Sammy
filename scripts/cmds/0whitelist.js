const { config } = global.GoatBot;
const { client } = global;
const fs = require('fs');

module.exports = {
  config: {
    name: "whitelist",
    aliases:["wl", "white"],
    version: "1.0",
    author: "King Monsterwith",
    role: 2,
    shortDescription: {
      en: "Add, delete, or list thread IDs from WhiteList"
    },
    longDescription: {
      en: "Add, delete, or list thread IDs from WhiteList. Usage: /whitelist [add/del/list/enable/disable] [thread ID]"
    },
    category: "ADMIN",
    guide: {
      en: "{pn} [add | del | list | on | off]",
    }
  },
  onStart: async function ({ message, args, threadsData }) {
    let config = {};
    try {
      config = JSON.parse(fs.readFileSync(client.dirConfig));
    } catch (err) {
      console.error('', err);
    }

    const whiteListMode = config.whiteListMode;
    const whiteListIds = whiteListMode.whiteListIds || [];
    const action = args[0];
    const threadId = args[1];

    if (action === "add") {
      if (!whiteListIds.includes(threadId)) {
        const threadData = await threadsData.get(threadId);
        const threadName = threadData.threadName;
        whiteListIds.push(threadId);
        whiteListMode.whiteListIds = whiteListIds;
        fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
        message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n• ${threadName} (${threadId}) has been added to WhiteListIds ✅\n\n╚════ஜ۩۞۩ஜ═══╝`);
      } else {
        const threadData = await threadsData.get(threadId);
        const threadName = threadData.threadName;
        message.reply(`╔════ஜ۩۞۩ஜ═══╗n\n\n• ${threadName} (${threadId}) is already in the WhiteListIds ✅\n\n╚════ஜ۩۞۩ஜ═══╝`);
      }
    } else if (action === "del") {
      const index = whiteListIds.indexOf(threadId);
      if (index >= 0) {
        const threadData = await threadsData.get(threadId);
        const threadName = threadData.threadName;
        whiteListIds.splice(index, 1);
        whiteListMode.whiteListIds = whiteListIds;
        fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
        message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n• ${threadName} (${threadId}) has been removed from WhiteListIds ✅\n\n╚════ஜ۩۞۩ஜ═══╝`);
      } else {
        const threadData = await threadsData.get(threadId);
        const threadName = threadData.threadName;
        message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n• ${threadName} (${threadId}) is not in the WhiteListIds ❌\n\n╚════ஜ۩۞۩ஜ═══╝`);
      }
    } else if (action === "list") {
      if (whiteListIds.length === 0) {
        message.reply("No thread IDs in WhiteListIds ❌");
      } else {
        const threadNames = await Promise.all(
          whiteListIds.map(threadId => threadsData.get(threadId).then(data => data.threadName))
        );
        const threadList = whiteListIds.map((id, index) => `${index+1}. ${threadNames[index]} (${id})`).join('\n');
        message.reply(`Thread IDs in WhiteListIds:\n${threadList}`);
      }
    } else if (action === "on") {
      config.whiteListMode.enable = true;
      fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
      message.reply(`╔════ஜ۩۞۩ஜ═══╗WhiteListMode has been Enabled ✅\n\n╚════ஜ۩۞۩ஜ═══╝`);
    } else if (action === "off") {
        config.whiteListMode.enable = false;
        fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
        message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\nWhiteListMode has been Disabled ✅\n\n╚════ஜ۩۞۩ஜ═══╝`);
      } else {
        message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nInvalid action. Usage: /whitelist [add/del/list/enable/disable] [thread ID]\n\n╚════ஜ۩۞۩ஜ═══╝");
      }
      }
      };