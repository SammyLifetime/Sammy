const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "couple3",
    aliases: ['couplev3'],
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
        console.error("Error creating couple image:", error);
        message.reply("Failed to create couple image. Please try again later.");
      }
    }
  }
};

async function bal(one, two) {
  const token = "6628568379|c1e620fa708a1d5696fb991c1bde5662";
  const avoneURL = `https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=${token}`;
  const avtwoURL = `https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=${token}`;
  const pth = "couplev4.png";
  const imgURL = "https://i.postimg.cc/FsJhDKzw/dcxvl1p-cbfce354-1b71-4adf-9d43-0c1f1b2d73b6.jpg";

  const [avone, avtwo, img] = await Promise.all([
    jimp.read(avoneURL),
    jimp.read(avtwoURL),
    jimp.read(imgURL)
  ]);

  avone.circle();
  avtwo.circle();

  img.resize(748, 748).composite(avone.resize(110, 110), 210, 175).composite(avtwo.resize(120, 120), 432, 190);

  await img.writeAsync(pth);
  return pth;
}
