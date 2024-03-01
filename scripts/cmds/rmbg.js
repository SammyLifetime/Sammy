const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs-extra');
const path = require('path');
const { image } = require('image-downloader');

module.exports = {
  config: {
    name: 'BackgroundRemoval',
    aliases: ['rbg2'],
    version: '1.0',
    author: 'Samir',
    countDown: 20,
    role: 0,
    shortDescription: 'Remove photo background',
    longDescription: 'Remove photo background',
    category: 'owner',
    guide: '{p} rmbg [Reply to the image] or {p} rmbg [image URL]',
  },
  onStart: async function ({ event, api, args }) {
    try {
      let imageUrl;
      if (event.type === 'message_reply') {
        const attachments = event.messageReply.attachments;
        if (!attachments || attachments.length === 0 || attachments[0].type !== 'photo') {
          return api.sendMessage('You must reply to a photo', event.threadID, event.messageID);
        }
        imageUrl = attachments[0].url;
      } else {
        imageUrl = args[0];
        if (!imageUrl || !imageUrl.startsWith('http')) {
          return api.sendMessage('Invalid image URL', event.threadID, event.messageID);
        }
      }

      const apiKey = '84c0044d-299c-423d-afc7-43fb9b831912'; // Replace with your DeepAI API key

      const inputPath = path.resolve(__dirname, 'cache', 'photo.png');
      await image({
        url: imageUrl,
        dest: inputPath,
      });

      const formData = new FormData();
      formData.append('image', fs.createReadStream(inputPath));

      const response = await axios.post('https://api.deepai.org/api/inpainting', formData, {
        headers: {
          ...formData.getHeaders(),
          'api-key': apiKey,
        },
        responseType: 'arraybuffer',
      });

      if (response.status !== 200) {
        throw new Error(`Failed to remove background. Status: ${response.status}`);
      }

      fs.writeFileSync(inputPath, response.data);
      api.sendMessage(
        {
          attachment: fs.createReadStream(inputPath),
        },
        event.threadID,
        () => {
          fs.unlinkSync(inputPath);
        }
      );
    } catch (error) {
      console.error('Request failed:', error);
      api.sendMessage('An error occurred while removing the background.', event.threadID, event.messageID);
    }
  },
};
