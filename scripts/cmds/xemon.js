module.exports = {
  config: {
    name: "xemon",
    version: "1.0",
    author: "MILAN",
    countDown: 10,
    role: 0,
    shortDescription: "meme maker",
    longDescription: "",
    category: "fun",
    guide: {
      en: "{pn}",
    }
  },

  onStart: async function ({ message, args, event, api }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const qs = require("querystring");
    text = args.join(" ");
    (event.type == "message_reply") ? message = event.messageReply.attachments[0].url: message = args.join(" ");
    const pathsave = __dirname + `/assets/banner.png`;
    let imageBuffer;
    api.sendMessage("", event.threadID, event.messageID);
    axios.get(`https://milanbhandari.imageapi.repl.co/xemon?text=${text}`, {responseType: "arraybuffer"}) .then(data => {const imageBuffer = data.data;
    fs.writeFileSync(pathsave, Buffer.from(imageBuffer));
    api.sendMessage({body: "", attachment: fs.createReadStream(pathsave)}, event.threadID, () => fs.unlinkSync(pathsave), event.messageID);}).catch(error => {

            let err;
            if (error.response) err = JSON.parse(error.response.data.toString());
            else err = error;
            return api.sendMessage(`Error! An error occurred. Please try again later ${err.error} ${err.message}`, event.threadID, event.messageID);
        })
},
};