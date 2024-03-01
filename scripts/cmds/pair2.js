const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: 'pair2',
    version: '1.0',
    author: 'xemon',
    countDown: 5,
    role: 0,
    shortDescription: '',
    longDescription: '',
    category: 'test',
  },
  onStart: async function ({ api, event, Threads, Users }) {
    var tl = [
      '21%',
      '67%',
      '19%',
      '37%',
      '17%',
      '96%',
      '52%',
      '62%',
      '76%',
      '83%',
      '100%',
      '99%',
      '0%',
      '48%',
    ];
    var tle = tl[Math.floor(Math.random() * tl.length)];
    let dataa = await api.getUserInfo(event.senderID);
    let namee = await dataa[event.senderID].name;
    let loz = await api.getThreadInfo(event.threadID);
    var emoji = loz.participantIDs;
    var id = emoji[Math.floor(Math.random() * emoji.length)];
    let data = await api.getUserInfo(id);
    let name = await data[id].name;
    var arraytag = [];
    arraytag.push({ id: event.senderID, tag: namee });
    arraytag.push({ id: id, tag: name });

    let Avatar = (
      await axios.get(
        `https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: 'arraybuffer' }
      )
    ).data;
    fs.writeFileSync(__dirname + '/cache/avt.png', Buffer.from(Avatar, 'utf-8'));

    let gifLove = (
      await axios.get(`https://i.ibb.co/wC2JJBb/trai-tim-lap-lanh.gif`, { responseType: 'arraybuffer' })
    ).data;
    fs.writeFileSync(__dirname + '/cache/giflove.png', Buffer.from(gifLove, 'utf-8'));

    let Avatar2 = (
      await axios.get(
        `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: 'arraybuffer' }
      )
    ).data;
    fs.writeFileSync(__dirname + '/cache/avt2.png', Buffer.from(Avatar2, 'utf-8'));

    var imglove = [];
    imglove.push(fs.createReadStream(__dirname + '/cache/avt.png'));
    imglove.push(fs.createReadStream(__dirname + '/cache/giflove.png'));
    imglove.push(fs.createReadStream(__dirname + '/cache/avt2.png'));

    var msg = {
      body: `🥰 Successful pairing!\💌 Wish you two hundred years of happiness\💕 Double ratio: ${tle}%\${namee} 💓 ${name}`,
      mentions: arraytag,
      attachment: imglove,
    };
    return api.sendMessage(msg, event.threadID, event.messageID);
  },
};