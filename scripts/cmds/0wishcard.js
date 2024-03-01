const axios = require('axios');

module.exports = {
  config: {
    name: "wishcard",
    version: "1.0",
    author: "Samir Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Tạo thiệp chúc mừng",
      en: "Create a wish card"
    },
    longDescription: {
      vi: "Tạo thiệp chúc mừng với văn bản tùy chỉnh",
      en: "Create a wish card with custom text"
    },
    category: "img",
    guide: {
      vi: "{pn} <văn-bản-1 | văn-bản-2>",
      en: "{pn} <text-1 | text-2>"
    }
  },

  onStart: async function ({ api, args, event }) {
    const senderID = event.senderID;
    const [text, text2] = args.join(' ').split('|').map(text => encodeURIComponent(text.trim()));

    try {
      const response = await axios.get(`https://image.restfulapi.repl.co/wishcard?text=${text}&text2=${text2}&uid=${senderID}`, { responseType: 'stream' });

      // Send the image as a file attachment
      api.sendMessage({
        attachment: response.data,
        body: 'Here\'s Your WishCard!',
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
    }
  }
};
