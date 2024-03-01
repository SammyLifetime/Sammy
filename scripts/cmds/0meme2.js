const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "meme2",
    version: "1.1",
    author: "SiAM",
    countdown: 0,
    role: 0,
    category: "Fun",
    shortDescription: "Get random funny memes or nsfw memes or search meme",
    longDescription: "Random meme generator. Get random funny memes or nsfw memes or search meme",
    guide: {
      en: "{pn} to get random meme\n {pn} nsfw for 18+ memes \n{pn} -s 'your text' to search meme",
    }
  },

  onStart: async function ({ api, args, message, event }) {



    const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);
    const approvedmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_main.json`));
    const bypassmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
    const bypassmUid = event.senderID;
    if (bypassmain.includes(bypassmUid)) {
      console.log(`User ${bypassmUid} is in bypass list. Skipping the main approval check.`);
    } else {
      const threadmID = event.threadID;
      if (!approvedmain.includes(threadmID)) {
        const msgSend = message.reply(`cmd 'meme' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
        setTimeout(async () => {
          message.unsend((await msgSend).messageID);
        }, 40000);
        return;
      }
    }  
      
    try {
      const approvedIds = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_ids.json`));
      const bypassIds = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
      const bypassUid = event.senderID;
      const threadID = event.threadID;

      if (args[0] === "nsfw") {
        if (!bypassIds.includes(bypassUid) && !approvedIds.includes(threadID)) {
          return message.reply("Your thread/group is not allowed to use the nsfw tag. Contact the admin for permission.");
        }
      }

      let apiUrl = "https://meme-api.com/gimme";

      if (args[0] === "nsfw") {
        apiUrl += "/nsfw";
      } else if (args[0] === "-s" || args[0] === "search") {
        if (!args[1]) {
          return message.reply("Please provide a subreddit to search for memes.");
        }
        const subreddit = args.slice(1).join(" ");
        apiUrl += `/${subreddit}`;
      }

      const response = await axios.get(apiUrl);
      const meme = response.data;
      const messageText = `☠️ ${meme.title} ☠️\nTag: ${meme.subreddit}\nNsfw: ${meme.nsfw ? "Yes" : "No"}`;

      if (meme.nsfw && !bypassIds.includes(bypassUid) && !approvedIds.includes(threadID)) {
        return message.reply("The meme was generated, but it is 18+ image. Your thread/group is not allowed to view 18+ meme image");
      }

      const responseImage = await axios.get(meme.url, { responseType: "arraybuffer" });
      const imageData = Buffer.from(responseImage.data, "binary");
      if (!imageData || imageData.length === 0) {
        return message.reply("The API provided a broken image. Please try again.");
          }
      const fileName = `meme-${new Date().getTime()}.${meme.url.split(".").pop()}`;
      fs.writeFileSync(fileName, imageData);
      const attachment = fs.createReadStream(fileName);

      message.reply(
        {
          body: messageText,
          attachment: attachment,
        },
        () => fs.unlinkSync(fileName)
      );
    } catch (error) {
      if (error.response && error.response.status === 404) {
        message.reply("This subreddit does not exist. Please check the spelling or try another subreddit.");
      } else {
        message.reply("Sorry 🥺 The API is not responding. Please try again.");
      }
    }
  },
};