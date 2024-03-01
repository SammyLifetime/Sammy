const axios = require("axios");
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "avoid",
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "avoid someone in nepal",
    longDescription: "avoid meme image edit",
    category: "fun",
    guide: {
      en: "{p}{n} delete or with tag",
    }
  },

  onStart: async function ({ api, event, args, Users, message }) {
    var id = Object.keys(event.mentions)[0] || event.senderID;
    var id1 = Object.keys(event.mentions)[1] || event.senderID;
    const img = `https://milanbhandari.imageapi.repl.co/avoid?uid=${id}`;
    const form = {
      body: `This person Must Be Avoided⚠️⚠`
    };
    form.attachment = [];
    form.attachment[0] = await global.utils.getStreamFromURL(img);
    message.reply(form);
  }
};
