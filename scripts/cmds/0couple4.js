const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
    config: {
        name: "couple4",
        aliases: ["couplefour","couplev4"],
        version: "1.0",
        author: "Samuel Kâñèñgeè",
        countDown: 5,
        role: 0,
        shortDescription: "mention someone",
        longDescription: "mention your love",
        category: "love",
        guide: "{pn}"
    },



    onStart: async function ({ message, event, args }) {
        const mention = Object.keys(event.mentions);
        if (mention.length == 0) return message.reply("mention han na aauta lai muji❗");
        else {
            const one = event.senderID, two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "Best Couple Ever😍", attachment: fs.createReadStream(ptth) }) })
        }
    }


};

async function bal(one, two) {

    let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avone.circle()
    let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avtwo.circle()
    let pth = "couplv4.png"
    let img = await jimp.read("https://i.postimg.cc/FsJhDKzw/dcxvl1p-cbfce354-1b71-4adf-9d43-0c1f1b2d73b6.jpg")

    img.resize(748, 748).composite(avone.resize(110, 110), 210, 175).composite(avtwo.resize(120, 120), 432, 190);

    await img.writeAsync(pth)
    return pth
      }