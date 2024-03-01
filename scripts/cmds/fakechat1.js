const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "facepalm",
    aliases: ["tst"],
    version: "1.1",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "Facepalm image",
    longDescription: "Facepalm image",
    category: "image",
    guide: {
      en: "{pn} @tag"
    }
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn nhấn tay vào trán"
    },
    en: {
      noTag: "You must tag the person you want to facepalm"
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    if (!uid2)
      return message.reply(getLang("noTag"));

    const avatarURL2 = await usersData.getAvatarUrl(uid2);
    const text = args.join(" ");
    const profileName = "Your Name"; // Replace with the desired profile name

    const apiUrl = `https://api.dev-tantrik.repl.co/fakechat?Message=${encodeURIComponent(
      text
    )}&profilePicUrl=${encodeURIComponent(
      avatarURL2
    )}&profileName=${encodeURIComponent(profileName)}&apikey=test-api`;

    try {
      const response = await axios.get(apiUrl, { responseType: "arraybuffer" });
      const img = Buffer.from(response.data, "binary");

      const pathSave = `${__dirname}/tmp/${uid2}_Facepalm.png`;
      fs.writeFileSync(pathSave, img);

      const content = args.join(" ").replace(Object.keys(event.mentions)[0], "");
      message.reply(
        {
          body: `${content || "Facepalm moment!"} 🤦‍♂️`,
          attachment: fs.createReadStream(pathSave)
        },
        () => fs.unlinkSync(pathSave)
      );
    } catch (error) {
      console.error("Failed to generate facepalm image:", error);
      message.reply("Failed to generate facepalm image. Please try again later.");
    }
  }
};
