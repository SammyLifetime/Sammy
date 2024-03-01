const fs = require('fs');
const jimp = require('jimp');
const QrCode = require('qrcode-reader');

module.exports = {
  config: {
    name: "qrscan",
    aliases: ['qrs'],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "QR Code scanner",
    longDescription: "QR Code scanner",
    category: "box chat",
    guide: {
      en: "{pn} Reply to qr code",
    }
  },

  onStart: async function ({ api, event, args }) {
    const path = __dirname + "/cache/qrcode.png";

    const { threadID, messageID, type, messageReply } = event;
    if (type !== "message_reply" || messageReply.attachments.length !== 1) {
      return api.sendMessage("You must respond to the qrcode image to be scanned", threadID, messageID);
    }

    if (messageReply.attachments[0].type === 'photo') {
      await require("image-downloader").image({ url: messageReply.attachments[0].url, dest: path });
      const img = await jimp.read(fs.readFileSync(path));
      const qr = new QrCode();
      const value = await new Promise((resolve, reject) => {
        qr.callback = (err, v) => err !== null ? reject(err) : resolve(v);
        qr.decode(img.bitmap);
      });
      return api.sendMessage(`Result: ${value.result}`, threadID, messageID);
    }
    
    return api.sendMessage("An error occurred while executing the command", threadID, messageID);
  }
};
