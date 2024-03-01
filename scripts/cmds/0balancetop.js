module.exports = {
  config: {
    name: "balancetop",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    role: 0,
    shortDescription: {
      vi: "",
      en: "top 5 users 🥰"
    },
    longDescription: {
      vi: "",
      en: "😗"
    },
    category: "ECONOMY",
    guide: {
      vi: "",
      en: ""
    }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const allUsers = await usersData.getAll();
 
    const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 50);
 
    const topUsersList = topUsers.map((user, index) => `${index + 1 }. ${user.name}: ${user.money}`);
 
    const messageText = `╔════ஜ۩۞۩ஜ═══╗\n\nTop 50 richest members👑:\n${topUsersList.join('\n')}\n\n╚════ஜ۩۞۩ஜ═══╝`;
 
    message.reply(messageText);
  }
};