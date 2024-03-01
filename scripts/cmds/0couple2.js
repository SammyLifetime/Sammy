const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
    config: {
        name: "couple2",
        aliases: ["coupleone2","couplev2","couple2"],
        version: "1.0",
        author: "Samuel Kâñèñgeè",
        countDown: 5,
        role: 0,
        shortDescription: "mention someone",
        longDescription: "mention your love",
        category: "love",//nib are my haters f*ck them 
        guide: "{pn}"
    },



    onStart: async function ({ message, event, args }) {
        const mention = Object.keys(event.mentions);
        if (mention.length == 0) return message.reply("Out of Mention Yes ❗");
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
    let pth = "couple.png"
    let img = await jimp.read("https://i.ibb.co/gmk4ZWC/image.jpg")

    img.resize(900, 896).composite(avone.resize(170, 170), 230, 290).composite(avtwo.resize(170, 170), 550, 370);

    await img.writeAsync(pth)
    return pth
}