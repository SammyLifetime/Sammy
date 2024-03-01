const fs = require("fs");
const path = require("path");
const axios = require("axios");
const tinyurl = require('tinyurl');

module.exports = {
  config: {
    name: "art2",
    aliases: ["2", "pxart"],
    version: "1.0",
    author: "Kshitiz",
    countDown: 20,
    role: 0,
    shortDescription: "lado puti",
    longDescription: "image to image",
    category: "game",
    guide: {
      en: "{p}pxart reply to image"
    }
  },
  onStart: async function ({ message, event, args }) {
    try {
      const promptApiUrl = "https://www.api.vyturex.com/describe?url="; // api credit Jarif
      const pixartApiUrl = "https://ai-tools.replit.app/pixart";

      if (event.type !== "message_reply") {
        return message.reply("❌ | Please reply to an image to use the command.");
      }

      const attachment = event.messageReply.attachments[0];
      if (!attachment || !["photo", "sticker"].includes(attachment.type)) {
        return message.reply("❌ | Reply must be an image.");
      }


      const imageUrl = await tinyurl.shorten(attachment.url);


      const promptResponse = await axios.get(promptApiUrl + encodeURIComponent(imageUrl));
      let prompt = promptResponse.data;


      const [promptArg, styleArg] = args.join(" ").split("|").map(item => item.trim());


      if (promptArg) {
        prompt = promptArg;
      }


      let style = 3;
      if (styleArg) {
        style = parseInt(styleArg);
      }


      const pixartResponse = await axios.get(pixartApiUrl, {
        params: {
          prompt: prompt,
          styles: style
        },
        responseType: "arraybuffer"
      });


      const cacheFolderPath = path.join(__dirname, "/cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `${Date.now()}_generated_image.png`);
      fs.writeFileSync(imagePath, Buffer.from(pixartResponse.data, "binary"));


      const stream = fs.createReadStream(imagePath);
      message.reply({
        body: "",
        attachment: stream
      });

    } catch (error) {
      console.error("Error:", error);
      message.reply("❌ | An error occurred. Please try again later.");
    }
  }
};