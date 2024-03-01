const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const a = {
  name: "sammy3",
  version: "2.0",
  author: "kshitiz",
  longDescription: "Chat with GPT-4",
  category: "ai",
  guide: {
    en: "{p}Sammy3 {prompt}"
  }
};

async function b(c, d, e, f) {
  try {
    const g = await axios.get(`https://ai-tools.replit.app/gpt?prompt=${encodeURIComponent(c)}&uid=${d}`);
    return g.data.gpt4;
  } catch (h) {
    throw h;
  }
}

async function i(c) {
  try {
    const j = await axios.get(`https://ai-tools.replit.app/sdxl?prompt=${encodeURIComponent(c)}&styles=7`, { responseType: 'arraybuffer' });
    return j.data;
  } catch (k) {
    throw k;
  }
}

async function l({ message, event, args, api }) {
  try {
    const m = event.senderID;
    const n = args.join(" ").trim();
    const o = args[0].toLowerCase() === "draw";

    if (!n) {
      return message.reply("Please provide a prompt.");
    }

    if (o) {
      await p(message, n);
    } else {
      const q = await b(n, m);
      message.reply(q, (r, s) => {
        global.GoatBot.onReply.set(s.messageID, {
          commandName: a.name,
          uid: m 
        });
      });
    }
  } catch (t) {
    console.error("Error:", t.message);
    message.reply("An error occurred while processing the request.");
  }
}

async function p(message, prompt) {
  try {
    const u = await i(prompt);


    const v = path.join(__dirname, 'cache', `image_${Date.now()}.png`);
    fs.writeFileSync(v, u);


    message.reply({
      body: "Generated image:",
      attachment: fs.createReadStream(v)
    });
  } catch (w) {
    console.error("Error:", w.message);
    message.reply("An error occurred while processing the request.");
  }
}

module.exports = {
  config: a,
  handleCommand: l,
  onStart: function ({ event, message, args, api }) {
    return l({ message, event, args, api });
  },
  onReply: function ({ message, event, args, api }) {
    return l({ message, event, args, api });
  }
};