const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "1HStTozEza0F12kig1jTZ1YwF5KMUTJb21UB20QR8Ff0X46rAZ8Lmi_L6VQcTs4ikCq_YNQBsI3RYKz12oRq7ZE0MSK-hrjCWiU8XatIJtR5ARs7qy4fONigJL26OwyrwNxB_QGyYSWZwpEl6cKhZ3vjpGAQ8ltpQrDjyIUOzMTNrGdydxSKl8VMOt4kwl7DcqTCQjkng0DFBUjycr2-im0v7eJS5LTFo3AGoOXTFYQ0";
const _U = "1HStTozEza0F12kig1jTZ1YwF5KMUTJb21UB20QR8Ff0X46rAZ8Lmi_L6VQcTs4ikCq_YNQBsI3RYKz12oRq7ZE0MSK-hrjCWiU8XatIJtR5ARs7qy4fONigJL26OwyrwNxB_QGyYSWZwpEl6cKhZ3vjpGAQ8ltpQrDjyIUOzMTNrGdydxSKl8VMOt4kwl7DcqTCQjkng0DFBUjycr2-im0v7eJS5LTFo3AGoOXTFYQ0";
module.exports = {
  config: {
    name: "dalle",
    aliases: ["dalle3"],
    version: "1.0.2",
    author: "Siam/King Monsterwith ",
    role: 0,
    countDown: 5,
    shortDescription: {
      en: "dalle"
    },
    longDescription: {
      en: ""
    },
    category: "dalle",
    guide: {
      en: "{prefix}dalle <search query> -<number of images>"
    }
  },

  onStart: async function ({ api, event, args }) {

const uid = event.senderID
    const permission = [`${uid}`];
    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        "You don't have enough permission to use this command. Only admin can do it.",
        event.threadID,
        event.messageID
      );
      return;
    }

    const keySearch = args.join(" ");
    const indexOfHyphen = keySearch.indexOf('-');
    const keySearchs = indexOfHyphen !== -1 ? keySearch.substr(0, indexOfHyphen).trim() : keySearch.trim();
    const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 4;

    try {
      const res = await axios.get(`https://api-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(keySearchs)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        api.sendMessage("No images found for the provided query.", event.threadID, event.messageID);
        return;
      }

      const imgData = [];
      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: `Here's your generated image✅`
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      api.sendMessage("cookie of the command. Is expired", event.threadID, event.messageID);
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
};