const axios = require('axios');

module.exports = {
  config: {
    name: "drawever",
    version: "1.0",
    author: "Rehat86, Chat GPT",
    category: "ai",
    role: 0,
    longDescription: {
      en:"Convert photo to anime art image."
    },
    guide: {en:"{pn} <reply_image>"}
  },
  onStart: async function ({ message, event }) {
    if (
      event.type === "message_reply" &&
      event.messageReply.attachments &&
      event.messageReply.attachments.length > 0 &&
      ["photo", "sticker"].includes(event.messageReply.attachments[0].type)
    ) {
      const imageUrl = event.messageReply.attachments[0].url;
      const encodedImageUrl = encodeURIComponent(imageUrl);
message.reply("Please wait...⏳");
      try {
        const response = await axios.get(`https://api-drawever-d08d4f91d6f0.herokuapp.com/api/drawever?imgurl=${encodedImageUrl}`);
        const mixedImageUrl = response.data.urls.mixed;
        
        if (mixedImageUrl) {
          const imageStream = await global.utils.getStreamFromURL(mixedImageUrl);
          await message.reply({
            attachment: [imageStream]
          });
        } else {
          message.reply("An error occurred.");
        }
      } catch (error) {
        console.error(error);
         message.reply("An error occurred.");
      }
    } else {
     message.reply("Please reply with an image.");
    }
  },
};