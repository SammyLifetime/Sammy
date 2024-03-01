const axios = require("axios");

module.exports = {
  config: {
    name: "lyrics2",
    version: "1.0",
    author: "Orochi Team",
    countDown: 1,
    role: 0,
    shortDescription: {
      en: "Get lyrics for a song",
    },
    longDescription: {
      en: "This command allows you to get the lyrics for a song. Usage: !lyrics <song name>",
    },
    category: "music",
    guide: {
      en: "{prefix}lyrics <song name>",
    },
  },

  onStart: async function ({ api, event, args }) {
    const songName = args.join(" ");
    if (!songName) {
      api.sendMessage("⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗧𝗜𝗧𝗟𝗘\n\n❁ Please provide a song name!", event.threadID, event.messageID);
      return;
    }

    const apiUrl = `https://lyrics-api.replit.app/lyrics?songName=${encodeURIComponent(songName)}`;
    try {
      const response = await axios.get(apiUrl);
      const { lyrics, title, artist, image } = response.data;
      if (!lyrics) {
        api.sendMessage("❌ 𝗟𝗬𝗥𝗜𝗖𝗦 𝗡𝗢𝗧 𝗙𝗢𝗨𝗡𝗗\n\n❁ Sorry, lyrics not found!", event.threadID, event.messageID);
        return;
      }
      let message = `Title ${title}\nDone by\n❥︎ ${artist} ✨\n\n🎶 Lyrics\n❥︎ ${lyrics}`;
      let attachment = await global.utils.getStreamFromURL(image);
      api.sendMessage({ body: message, attachment }, event.threadID, (err, info) => {
        let id = info.messageID;
      });
    } catch (error) {
      console.error(error);
      api.sendMessage("Sorry, there was an error getting the lyrics!", event.threadID, event.messageID);
    }
  },
};