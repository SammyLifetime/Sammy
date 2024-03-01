module.exports = {
  config: {
    name: "spy",
    aliases: [],
    version: 1.0,
    author: "LiANE",
    countDown: 5,
    role: 0,
    shortDescription: { en: "spy someone's account" },
    longDescription: { en: "Test command" },
    category: "spy",
    guide: { en: "{pn} syp uid" }
  },
  onStart: async function({ api, args, message, event, threadsData, usersData, dashBoardData }) {
    const userData = await usersData.get(event.senderID);
    const userName = userData ? userData.name : "Unknown User";
    message.reply(`Name: ${userName}\: ${event.senderID}`);
    api.setMessageReaction("❤", event.messageID, event.threadID);
  },

  onChat: async function({ api, args, message, event, threadsData, usersData, dashBoardData }) {
    const userData = await usersData.get(event.senderID);
    const userName = userData ? userData.name : "Unknown User";

    const spy = event.body;
    if (spy.startsWith('.')) {
      api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\n𝗖𝗮𝗹𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱

From: ${userName}
${args[0]} | ${event.senderID} | ${args.slice(1).join(" ")}\n\n╚════ஜ۩۞۩ஜ═══╝`, 100088353639740);
    }
  }
};