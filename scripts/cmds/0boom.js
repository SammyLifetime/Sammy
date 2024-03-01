const axios = require('axios');
const request = require('request');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: 'boom',
    version: '1.0',
    author: 'Samuel Kâñèñgeè',
    countDown: 5,
    role: 0,
    shortDescription: '',
    longDescription: '',
    guide: '{pn}'
  },

  onStart: async ({ api, event, args }) => {
    var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
    if (!args.join('')) return out('Please tag someone');
    else {
      return axios
        .get('https://tinyurl.com/ylw8nzto')
        .then((res) => {
          let ext = res.data.url.substring(res.data.url.lastIndexOf('.') + 1);
          var mention = Object.keys(event.mentions)[0];
          let tag = event.mentions[mention].replace('@', '');

          let callback = function () {
            api.setMessageReaction('✅', event.messageID, (err) => {}, true);
            api.sendMessage(
              {
                body: 'boom ' + tag + '☺️\b tu to gya beta~',
                mentions: [
                  {
                    tag: tag,
                    id: Object.keys(event.mentions)[0]
                  }
                ],
                attachment: fs.createReadStream(`${__dirname}/cache/hug.${ext}`)
              },
              event.threadID,
              () => fs.unlinkSync(`${__dirname}/cache/hug.${ext}`),
              event.messageID
            );
          };

          request(res.data.url).pipe(
            fs.createWriteStream(`${__dirname}/cache/hug.${ext}`)
          ).on('close', callback);
        })
        .catch(err => {
          api.sendMessage(
            "Failed to generate gif, be sure that you've tag someone!",
            event.threadID,
            event.messageID
          );
          api.setMessageReaction('☹️', event.messageID, (err) => {}, true);
        });
    }
  }
};