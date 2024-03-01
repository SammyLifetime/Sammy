const axios = require("axios");
const fs = require("fs");
module.exports = {
  config: {
    name: "groupimg",
    aliases: ['gcimg', 'boximg'],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 1,
    shortDescription: "groupimg",
    longDescription: "groupimg",
    category: "box chat",
  }, 
  onStart: async function({api, event, args}) {
    if (event.type !== "message_reply") return api.sendMessage("❌ You have to reply to a photo", event.threadID, event.messageID);
	if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❌ You have to reply to a photo", event.threadID, event.messageID);
	if (event.messageReply.attachments.length > 1) return api.sendMessage(`Please reply only 1 photo!`, event.threadID, event.messageID);
	var abc = event.messageReply.attachments[0].url
	let pathImg = __dirname + '/cache/loz.png';
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(pathImg, Buffer.from(getdata, 'utf-8'));
    return api.changeGroupImage(fs.createReadStream(__dirname + '/cache/loz.png'), event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
  }
};
