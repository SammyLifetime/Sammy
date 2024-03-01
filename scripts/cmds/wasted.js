const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
    config: {
        name: "wasted",
        aliases: ["waste"],
        version: "1.0",
        author: "Samir B. Thakuri",
        countDown: 5,
        role: 0,
        shortDescription: "Wasted meme",
        longDescription: "",
        category: "fun",
        guide: {
			vi: "{pn} [@tag]",
			en: "{pn} [@tag]"
		}
    },

  onStart: async function ({ api, event, args, Users, message }) {
    let mention = Object.keys(event.mentions)
    let uid;

    if (event.type == "message_reply") {
      uid = event.messageReply.senderID
    } else {
      if (mention[0]) {
        uid = mention[0]
      } else {
        console.log(" jsjsj")
        uid = event.senderID
      }
    }
    
    const img = `https://milanbhandari.imageapi.repl.co/wasted?uid=${uid}`;
    const form = {
      body: `Wasted!! `
    };
    form.attachment = [];
    form.attachment[0] = await global.utils.getStreamFromURL(img);
    message.reply(form);
  }
};