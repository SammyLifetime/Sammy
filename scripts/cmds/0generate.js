const axios = require('axios');

module.exports = {
  config: {
    name: "generate",
    aliases: ["gene"],
    version: "1.1",
    author: "MILAN",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "Text to image"
    },
    category: "image",
    guide: {
      en: '{pn} your prompt | Type' +
        ' here are supported models:' +
        '\n' +  // Added a new line character here
        ' 1: Analog-Diffusion-1.0' +
        '\n2: Anything V3' +
        '\n3: Anything V4.5' +
        '\n4: AOM3A3' +
        '\n5: Deliberate V2' +
        '\n6: Dreamlike-Diffusion-1.0' +
        '\n7: Dreamlike-Diffusion-2.0' +
        '\n8: Dreamshaper 5Baked vae' +
        '\n9: Dreamshaper 6Baked vae' +
        '\n10: Elldreths-Vivid-Mix' +
        '\n11: Lyriel_V15' +
        '\n12: Lyriel_V16' +
        '\n13: Mechamix_V10' +
        '\n14: Meinamix_Meinav9' +
        '\n15: Openjourney_V4' +
        '\n16: Portrait+1.0' +
        '\n17: Realistic_Vision_V1.4' +
        '\n18: Realistic_Vision_V2.0' +
        '\n19: revAnimated_v122' +
        '\n20: sdv1_4' +
        '\n21: V1' +
        '\n22: shoninsBeautiful_v10' +
        '\n23: Theallys-MIX-II-CHURNED' +
        '\n24: Timeless-1.0'
    }
  },

  onStart: async function ({ message, args }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("Please provide a prompt.");
    }

    let prompt, model;
    if (text.includes("|")) {
      const [promptText, modelText] = text.split("|").map((str) => str.trim());
      prompt = promptText;
      model = modelText;
    } else {
      prompt = text;
      model = "19";  // Converted model to a string
    }

    let id;  // Declare 'id' variable outside the message.reply() call

    message.reply("✅| Creating your Imagination...").then((info) => {
      id = info.messageID;  // Assign 'id' the value of info.messageID
    });

    try {
      const API = `https://milanbhandari.imageapi.repl.co/generate?prompt=${encodeURIComponent(prompt)}&model=${model}`;
      const imageStream = await global.utils.getStreamFromURL(API);

      return message.reply({
        attachment: imageStream
      });
    } catch (error) {
      console.log(error);
      message.reply("Failed to generate your imagination.").then(() => {
        message.delete(id);
      });
    }
  }
};
