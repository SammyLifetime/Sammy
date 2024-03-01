const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
    config: {
        name: "flirting",
        aliases: "flirt",
        version: "1.0",
        author: "SiAM",
        countdown: 2,
        role: 0,
        category: "Fun",
        ShortDescription: "Get a random pickup line",
        LongDescription: "Uses an API to generate a random pickup line.",
        guide: {
            en: "Just type {pn}"
        }
    },

    onStart: async function({ api, args, message, event }) {



      const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);
    const approvedmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_main.json`));
    const bypassmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
    const bypassmUid = event.senderID;
    if (bypassmain.includes(bypassmUid)) {
      console.log(`╔════ஜ۩۞۩ஜ═══╗\n\nUser ${bypassmUid} is in bypass list. Skipping the main approval check.\n\n╚════ஜ۩۞۩ஜ═══╝`);
    } else {
      const threadmID = event.threadID;
      if (!approvedmain.includes(threadmID)) {
        const msgSend = message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\ncmd 'pickupline' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin\n\n╚════ஜ۩۞۩ஜ═══╝`);
        setTimeout(async () => {
          message.unsend((await msgSend).messageID);
        }, 40000);
        return;
      }
    }  
      
        try {
            const response = await axios.get("https://api.popcat.xyz/pickuplines");
            const pickupline = response.data.pickupline;
            message.reply(pickupline);
        } catch (error) {
            message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nSorry, the API is not responding. Please try again later.\n\n╚════ஜ۩۞۩ஜ═══╝");
        }
    }
};