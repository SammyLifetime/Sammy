const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
    config: {
        name: "geda",
        aliases: ["eggs", "balls"],
        version: "1.0",
        author: "zach",
        countDown: 15,
        role: 0,
        shortDescription: "break someone's balls",
        longDescription: "",
        category: "fun",
        guide: "{pn} @tag"
    },



    onStart: async function ({ message, event, args }) {
        const mention = Object.keys(event.mentions);
        if (mention.length == 0) return message.reply("Please mention someone");
        else if (mention.length == 1) {
            const one = event.senderID, two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "I Have Metal Balls Bruh!!!!!!!!", attachment: fs.createReadStream(ptth) }) })
        } else {
            const one = mention[1], two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "I Have Metal Balls Bruh!!!!!!!!", attachment: fs.createReadStream(ptth) }) })
        }
    }


};

async function bal(one, two) {

    let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avone.circle()
    let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avtwo.circle()
    let pth = "abcd.png"
    let img = await jimp.read("https://i.ibb.co/pPpkdrr/342880194-769189751342984-6981478009053671561-n-png-stp-dst-png-p480x480-nc-cat-100-ccb-1-7-nc-sid-a.png")

    img.resize(1080, 1320).composite(avone.resize(170, 170), 200, 320).composite(avtwo.resize(170, 170), 610, 70);

    await img.writeAsync(pth)
    return pth
  }