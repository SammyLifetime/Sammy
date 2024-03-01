const axios = require("axios");

let handlerEnabled = false; // Initialize the handler as disabled

module.exports = {
  config: {
    name: "handler",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, handler }) {
    // Listen for message reactions only if the handler is enabled
    if (handlerEnabled) {
      api.listenMqtt("event", async (msg) => {
        if (msg.type === "message_reaction" && msg.reaction === "😡") {
          // Check if the reaction is a mad emoji

          // Get the message information
          const messageInfo = await api.getMessageInfo(msg.messageID);

          // Unsend the bot message that the user reacted on
          api.unsendMessage(messageInfo.threadID, messageInfo.messageID);
        }
      });
    }
  },

  onChat: async function ({ api, event, args, handler }) {
    const command = args[0]; // Get the first argument

    if (command === "on") {
      if (handlerEnabled) {
        api.sendMessage("✅ Handler is already turned on!", event.threadID);
      } else {
        handlerEnabled = true; // Enable the handler
        api.sendMessage("✅ Successfully turned on handler!", event.threadID);
      }
    } else if (command === "off") {
      if (!handlerEnabled) {
        api.sendMessage("❎ Handler is already turned off!", event.threadID);
      } else {
        handlerEnabled = false; // Disable the handler
        api.sendMessage("❎ Successfully turned off handler!", event.threadID);
      }
    }
  },
};