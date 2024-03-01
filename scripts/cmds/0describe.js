const axios = require("axios");

module.exports = {
  config: {
    name: "describe",
    aliases: ["imgtoprompt"],
    version: "1.0",
    author: "King Monsterwith",
    category: "Prompt",
    guide: "Converts an image to a prompt.",
  },

  onStart: async function ({ event, message, args, api }) {
    try {
      const imageUrl = event.messageReply?.attachments[0]?.url;

      if (!imageUrl) {
        return message.reply(`Please reply to an image.`);
      } else {
        const waitMessage = await message.reply("Please wait...");

        try {
          const response = await axios.get(
            `http://103.188.244.205:7890/prompt?imageUrl=${encodeURIComponent(imageUrl)}&apikey=8kkmMgb5knwHjALe`
          );

          const description = response.data.description;
          if (description) {
            message.reply(`${description}`);
          } else {
            message.reply("Failed to get a prompt from the image.");
          }
        } catch (error) {
          console.error(error);
          message.reply("An error occurred while processing the image.");
        }

        // Unsend the wait message
        api.unsendMessage(waitMessage.messageID);
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred.");
    }
  },
};