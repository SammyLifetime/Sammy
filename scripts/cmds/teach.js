const axios = require("axios");

module.exports = {
  config: {
    name: "teach",
    aliases: ["simteach", "teachsim"],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "Teach simsimi",
    longDescription: {
      en: "Teach simsimi"
    },
    category: "ai",
    guide: {
      en: "{pn} <Say> => <Response>"
    }
  },

  onStart: async function ({ api, event, message }) {
    const info = event.body.slice(event.body.indexOf(' ') + 1);
    if (!info) {
      return message.reply("Please enter in the format:\nteach Say => Response");
    }

    const [text, text1] = info.split("=>").map((item) => item.trim());
    const url = `https://sim.ainz-project.repl.co/teach?ask=${encodeURIComponent(text)}&ans=${encodeURIComponent(text1)}`;

    try {
      const response = await axios.get(url);
        message.reply(`Successfully Taught! \nUser Say: ${response.data.ask} \nResponse: ${response.data.ans}`);
      } catch (error) {
      console.error(error);
      message.reply("System Busy!! My Developer (Samir B. Thakuri) Is Fixing It....");
    }
  }
};
