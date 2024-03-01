const Canvas = require("canvas");
const jimp = require("jimp");
const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "toilet",
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "Toilet 🚽",
    longDescription: "Toilet 🚽",
    category: "fun",
    guide: {
      en: "{pn} @mention",
    },
  },

  onStart: async function ({ api, event, args, Users }) {
    try {
      var path_toilet = __dirname + "/cache/toilet.png";
      var id = Object.keys(event.mentions)[0] || event.senderID;
      const canvas = Canvas.createCanvas(500, 670);
      const ctx = canvas.getContext("2d");
      const background = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/779441456464003122/812706484240121876/unknown.png"
      );

      const response = await axios.get(
        `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        {
          responseType: "arraybuffer",
        }
      );
      var avatar = Buffer.from(response.data, "binary");
      avatar = await this.circle(avatar);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(await Canvas.loadImage(avatar), 135, 350, 205, 205);
      const imageBuffer = canvas.toBuffer();
      fs.writeFileSync(path_toilet, imageBuffer);
      api.sendMessage(
        {
          attachment: fs.createReadStream(path_toilet, {
            highWaterMark: 128 * 1024,
          }),
          body: "「 Your Deserving Place 」",
        },
        event.threadID,
        () => fs.unlinkSync(path_toilet),
        event.messageID
      );
    } catch (e) {
      api.sendMessage(e.stack, event.threadID);
    }
  },

  circle: function (buffer) {
    return new Promise((resolve, reject) => {
      jimp.read(buffer, (err, image) => {
        if (err) return reject(err);
        image.circle();
        image.getBuffer(jimp.MIME_PNG, (err, buffer) => {
          if (err) return reject(err);
          resolve(buffer);
        });
      });
    });
  },
};
