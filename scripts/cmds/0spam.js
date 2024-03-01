module.exports = {
  config: {
    name: "spam",
    version: "1.3",
    author: "AceGun",
    role: 2,
    shortDescription: "bother your friends by mentioning",
    longDescription: "",
    category: "fun",
    guide: {
      vi: "",
      en: "{pn} @(mention)"
    }
  },

  onStart: async function ({ api, event, userData, args }) {
    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("Please mention a person whom you want to bother.", event.threadID);
    let userId = mention;
    let userMention = event.mentions[mention];
    
    const message = args.slice(2).join(" "); // Remove prefix, command name, and mention

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        api.sendMessage({ body: `${userMention} ${message}`, mentions: [{ tag: userMention, id: userId }] }, event.threadID);
      }, i * 200);
    }
  }
};