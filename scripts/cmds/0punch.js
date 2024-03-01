const request = require('request');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: 'punch',
    version: '1.0',
    author: 'Samuel Kâñèñgeè',
    countDown: 5,
    role: 0,
    shortDescription: '',
    longDescription: '',
    guide: '{pn}'
  },
  onStart: async ({ api, event, args }) => {
    const axios = require('axios');
    const fs = require('fs');
    const out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
    
    if (!args.join("")) {
      return out("Please tag someone");
    } else {
      return axios.get('https://api.satou-chan.xyz/api/endpoint/punch')
        .then(res => {
          let getURL = res.data.url;
          let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
          var mention = Object.keys(event.mentions)[0];
          let tag = event.mentions[mention].replace("@", ""); 

          let callback = function () {
            api.setMessageReaction("✅", event.messageID, (err) => {}, true);
            api.sendMessage({
              body: "YOU FVCKERRRR DEEKHEAD " + tag,
              mentions: [{
                tag: tag,
                id: Object.keys(event.mentions)[0]
              }],
              attachment: fs.createReadStream(__dirname + `/cache/punch.${ext}`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/punch.${ext}`), event.messageID);
          };
          
          request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/punch.${ext}`)).on("close", callback);
        })
        .catch(err => {
          api.sendMessage("Failed to generate gif, be sure that you've tagged someone!", event.threadID, event.messageID);
          api.setMessageReaction("☹", event.messageID, (err) => {}, true);
        });
    }
  }
}