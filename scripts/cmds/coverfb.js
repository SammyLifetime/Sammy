const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "fbcover",
    version: "1.0",
    author: "Samir.",
    countDown: 10,
    role: 0,
    shortDescription: "Create fb cover",
    longDescription: "Create fb cover",
    category: "avt & banners",
    guide: {
      en: "{p}{n} name | subname | address | email | phone nbr | color (default = no )",
    },
  },

  onStart: async function ({ api, event, args }) {
    const uid = event.senderID;
    const info = args.join(" ");

    if (!info) {
      return api.sendMessage("Please enter in the format:\nfbcover name | subname | address | email | phone nbr | color (default = no )", event.threadID);
    } else {
      const msg = info.split("|");
      const name = msg[0].trim();
      const subname = msg[1].trim();
      const address = msg[2].trim();
      const email = msg[3].trim();
      const phone = msg[4].trim();
      const color = msg[5].trim();

      api.sendMessage("Processing your cover, please wait...", event.threadID);

      const img = `https://www.nguyenmanh.name.vn/api/fbcover1?name=${encodeURIComponent(name)}&uid=${uid}&address=${encodeURIComponent(address)}&email=${encodeURIComponent(email)}&subname=${encodeURIComponent(subname)}&sdt=${encodeURIComponent(phone)}&color=${encodeURIComponent(color)}&apikey=FSShCQne`;

      try {
        const response = await axios.get(img, { responseType: 'arraybuffer' });
        const image = await jimp.read(response.data);

        const outputPath = `./fbcover_${uid}.png`;
        await image.writeAsync(outputPath);

        const attachment = fs.createReadStream(outputPath);
        api.sendMessage({ attachment }, event.threadID, () => fs.unlinkSync(outputPath));
      } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while generating the FB cover.", event.threadID);
      }
    }
  },
};
