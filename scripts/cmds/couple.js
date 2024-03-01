const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "couple",
    aliases: ["coupleone", "couplev", "couple"],
    version: "1.0",
    author: "AKASH",
    countDown: 5,
    role: 0,
    shortDescription: "mention someone",
    longDescription: "mention your love",
    category: "LOVE",
    guide: "{pn} <@mention>"
  },

  onStart: async function ({ message, event, args }) {
    const mention = Object.keys(event.mentions);
    if (mention.length === 0) {
      return message.reply("Please mention someone❗");
    } else {
      const one = event.senderID;
      const two = mention[0];
      try {
        const ptth = await bal(one, two);
        message.reply({ body: "Best Couple Ever😍", attachment: fs.createReadStream(ptth) });
      } catch (error) {
        console.error("Error generating couple image:", error);
        message.reply("An error occurred while generating the couple image. Please try again later.");
      }
    }
  }
};

async function bal(one, two) {
  const token = "6628568379|c1e620fa708a1d5696fb991c1bde5662";
  const avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=${token}`);
  avone.circle();
  const avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=${token}`);
  avtwo.circle();
  const pth = "couple.png";
  const img = await jimp.read("https://i.ibb.co/gmk4ZWC/image.jpg");

  img.resize(900, 896).composite(avone.resize(170, 170), 230, 290).composite(avtwo.resize(170, 170), 550, 370);

  await img.writeAsync(pth);
  return pth;
}
