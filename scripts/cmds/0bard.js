const axios = require('axios');
const fs = require("fs");
module.exports = {
	config: {
		name: "bard",
		version: "1.0",
		author: "Samir Thakuri",
		countDown: 5,
		role: 0,
		shortDescription: "Chat With Bard Ai",
		longDescription: "Google Bard is a natural language generation model can generate poetry and rhyming verse. Also can shows you a picture on your request",
		category: "ai",
		guide: {
			en: "{pn} <query>"
		},
	},

	onStart: async function ({ api, event }) {
  const { threadID, messageID, type, messageReply, body } = event;

  let question = "";

  if (type === "message_reply" && messageReply.attachments[0]?.type === "photo") {
    const attachment = messageReply.attachments[0];
    const imageURL = attachment.url;
    question = await convertImageToText(imageURL);

    if (!question) {
      api.sendMessage(
        "❌ Failed to convert the photo to text. Please try again with a clearer photo.",
        threadID,
        messageID
      );
      return;
    }
  } else {
    question = body.slice(5).trim();

    if (!question) {
      api.sendMessage("Please provide a question or query", threadID, messageID);
      return;
    }
  }


  try {
    const res = await axios.get(
      `https://api.samirthakuri.repl.co/api/bard?ask=${encodeURIComponent(question)}&apikey=97699`
    );

    const respond = res.data.message;
    const imageUrls = res.data.imageUrls;

    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      const attachments = [];

      if (!fs.existsSync("cache")) {
        fs.mkdirSync("cache");
      }

      for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const imagePath = `cache/image${i + 1}.png`;

        try {
          const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
          fs.writeFileSync(imagePath, imageResponse.data);

          attachments.push(fs.createReadStream(imagePath));
        } catch (error) {
          console.error("Error occurred while downloading and saving the image:", error);
        }
      }

      api.sendMessage(
        {
          attachment: attachments,
          body: respond,
        },
        threadID,
        messageID
      );
    } else {
      api.sendMessage(respond, threadID, messageID);
    }
  } catch (error) {
    console.error("Error occurred while fetching data from the Bard API:", error);
    api.sendMessage("An error occurred while fetching data. Please try again later.", threadID, messageID);
  }
    async function convertImageToText(imageURL) {
  const response = await axios.get(
    `https://api.samirthakuri.repl.co/api/ocr?url=${encodeURIComponent(imageURL)}`
  );
  return response.data.text;
  }
}
};