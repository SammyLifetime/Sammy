const axios = require("axios");
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "burn",
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "burn image edit",
    longDescription: "burn image edit",
    category: "fun",
    guide: {
      en: "{p}{n} burn or with tag",
    }
  },

  onStart: async function ({ api, event, args, Users, message }) {
    var id = Object.keys(event.mentions)[0] || event.senderID;
    var id1 = Object.keys(event.mentions)[1] || event.senderID;
    const img = `https://tanjiro-api.onrender.com/burn?uid=${id}&api_key=tanjiro`;
    const form = {
      body: `HAHAHAHA...`
    };
    form.attachment = [];
    form.attachment[0] = await global.utils.getStreamFromURL(img);
    message.reply(form);
  }
};
