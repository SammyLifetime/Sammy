module.exports = {
  config: {
    name: "phant",
    aliases: ["phantich", "ph"],
    version: "1.0",
    author: "King Monsterwith",
    countDown: 5,
    roles: 2,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "chat box",
    guide: {
      en: "{p}sms id text"
    }
  },
  onStart: async function ({ api, event, args, Users, Currencies }) {
    const fs = require("fs-extra");
    const request = require("request");
    const t = [
      "Shrimp age",
      "I don't know what age",
      "The age of the geese",
      "Children's age",
      "Age of shrimp",
      "You are the same age as my son",
      "Cunt"
    ];
    const tc = [
      "Confidence",
      "Quiet",
      "Self-deprecation",
      "Grumpy",
      "Gentle",
      "Calms like a cunt",
      "Emotional person",
      "Ambitious",
      "Personal person",
      "Rational Man",
      "Loyalist",
      "Enthusiasm",
      "Strong person",
      "Mild"
    ];
    const y = [
      "Money",
      "love",
      "Family",
      "Sex",
      "I don't know what you love, I don't know",
      "Pink",
      "Animal",
      "Job"
    ];
    const g = [
      "Lie",
      "Beast",
      "Talkative",
      "Shut your pussy",
      "I don't know what you hate",
      "Violence",
      "Animal",
      "Crowded",
      "Learn",
      "Sex",
      "Ex",
      "Lie"
    ];
    const mt = [
      "Too Independent",
      "Talkative",
      "Do without thinking",
      "Negative",
      "Thinking too much, miscellaneous",
      "Not thinking for yourself",
      "Selfish",
      "Longing for violence",
      "Pilfer",
      "Likes to gamble"
    ];
    const ms = [
      "Fun",
      "Peaceful",
      "nhoi",
      "Nhoi",
      "muddy",
      "Make others comfortable",
      "Often help others",
      "On time",
      "Loyal",
      "Respect others",
      "Keep promise",
      "Generosity",
      "Empathetic"
    ];
    const bm = [
      "Hot body",
      "A lot of money",
      "Gay",
      "Vcl poor",
      "It's too secret, I don't know",
      "People who don't know how to keep secrets",
      "Study stupid",
      "Genius",
      "Eat a lot"
    ];
    const tk = [
      "A person with a beautiful soul",
      "Liberal people",
      "Being mean or making others uncomfortable",
      "Humans don't know how to think",
      "Don't Know Before, Know Later"
    ];

    if (Object.keys(event.mentions).length == 1) {
      var mentions = Object.keys(event.mentions);
      var data = await Currencies.getData(mentions);
      var name = (await Users.getData(mentions)).name;
      var callback = () =>
        api.sendMessage(
          {
            body: `ANALYZE YOUR AVATAR\n\n👽Name: ${name}\n🗓Age: ${
              t[Math.floor(Math.random * t.length)]
            }\n🤖Personality: ${
              tc[Math.floor(Math.random() * tc.length)]
            }\n💗Love: ${y[Math.floor(Math.random() * y.length)]}\n💀Hate: ${g[Math.floor(Math.random() * g.length)]}\n⬛Dark side: ${
              mt[Math.floor(Math.random() * mt.length)]
            }\n⬜Side am: ${ms[Math.floor(Math.random() * ms.length)]}\n🔐Secret: ${
              bm[Math.floor(Math.random() * bm.length)]
            }\n ⚖Summary: ${tk[Math.floor(Math.random() * tk.length)]}`,
            attachment: fs.createReadStream(__dirname + "/cache/1.png")
          },
          event.threadID,
          () => fs.unlinkSync(__dirname + "/cache/1.png"),
          event.messageID
        );
      return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
        .on('close', () => callback());
    } else {
      if (!args[0]) {
        let idmen;
        if (event.type == "message_reply") {
          idmen = event.messageReply.senderID;
        } else {
          idmen = event.senderID;
        }
        var data = await Currencies.getData(idmen);
        var name = (await Users.getData(idmen)).name;
        var callback = () =>
          api.sendMessage(
            {
              body: `ANALYZE YOUR AVATAR\n\n👽Name: ${name}\n🗓Age: ${
                t[Math.floor(Math.random() * t.length)]
              }\n🤖Personality: ${
                tc[Math.floor(Math.random() * tc.length)]
              }\n💗Love: ${y[Math.floor(Math.random() * y.length)]}\n💀Hate: ${
                g[Math.floor(Math.random() * g.length)]
              }\n⬛Dark side: ${
                mt[Math.floor(Math.random() * mt.length)]
              }\n⬜Side am: ${ms[Math.floor(Math.random() * ms.length)]}\n🔐Secret: ${
                bm[Math.floor(Math.random() * bm.length)]
              }\n ⚖Summary: ${tk[Math.floor(Math.random() * tk.length)]}`,
              attachment: fs.createReadStream(__dirname + "/cache/1.png")
            },
            event.threadID,
            () => fs.unlinkSync(__dirname + "/cache/1.png"),
            event.messageID
          );
        return request(encodeURI(`https://graph.facebook.com/${idmen}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`))
          .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
          .on('close', () => callback());
      }
    }
  }
};