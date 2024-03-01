const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "banner2",
    aliases: ['genshin'],
    version: "1.0",
    author: "Samir Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: "Create Genshin Banner",
    longDescription: "",
    category: "avt & banners",
    guide: {
      vi: "{p}{n} <name> | <slogan> | <characterid> (from 0 - 62)",
      en: "{p}{n} <name> | <slogan> | <characterid> (from 0 - 62)"
    }
  },

  onStart: async function ({ message, args, event, api }) {
    const info = event.body.slice(event.body.indexOf(' ') + 1);
    if (!info) {
      return message.reply("Please enter in the format:\ngfx3  name | subname");
    }

    const [charid, name, slogan] = info.split("|").map((item) => item.trim());

    await message.reply("Processing your requests, please wait...");

    const img = `https://goatbot.tk/api/anime/banner-genshin?apikey=dn7L63ZaXCxYZM1OS0h9T8dMFao4Lrmv&name=${name}&slogan=${slogan}&idCharacter=${charid}`;

    const form = {
      body: `Here's Your Banner❤️ \nName: ${name} \nSlogan: ${slogan} \nCharacterId: ${charid}`,
      attachment: [await global.utils.getStreamFromURL(img)]
    };

    message.reply(form);
  }
};
