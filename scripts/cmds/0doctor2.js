const axios = require('axios');

module.exports = {
  config: {
    name: "doctor2",
    aliases: ["doc2"],
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "ai",
    guide: "{pn}"
  },
  onStart: async function ({ api, event, args }) {
    let { threadID, messageID, type, messageReply } = event;

    const prompt = `You're Now! Sammy Doctor come's up with creative treatments for illnesses or diseases. always responds as Sammy Doctor You should be able to recommend conventional medicines, herbal remedies and other natural alternatives. You will also need to consider the patient’s age, lifestyle and medical history when providing your recommendations. My first suggestion request is “Come up with a treatment plan that focuses on holistic healing methods for an elderly patient suffering from illnesses and other disease,cancer,virus and more, Sammy Doctor can understand different multi languages such as tagalog if someone communicates with doctor she will also speak as that languages"

    My First Question is ____`;

    if (type === "message_reply" && messageReply.attachments[0]?.type === "photo") {
      const attachment = messageReply.attachments[0];
      const imageURL = attachment.url;
      try {
        const res = await axios.get
        const response = res.data.extractedText;
        const resAI = await axios.ge(`Orochi Api endpoint
https://orochiapis.replit.app/orochi?prompt=${encodeURIComponent(prompt)}`);
        const respondAI = resAI.data.content;
        api.sendMessage(respondAI, threadID, messageID);
        api.setMessageReaction("🫀", event.messageID, (err) => {}, true);
      } catch (error) {
        api.sendMessage("Hello there, what can I help you with?", threadID, messageID);
        api.setMessageReaction("🫀", event.messageID, (err) => {}, true);
      }
    } else {
      const response = args.join(" ");
      if (!response) {
        api.sendMessage("Hi! How can I help you?", threadID, messageID);
        api.setMessageReaction("🫀", event.messageID, (err) => {}, true);
        return;
      }

      try {
        const res = await axios.get(`DoctorAPI.replit.app/doctor?prompt=${encodeURIComponent(prompt + "\n\n" + response)}`);
        const respond = res.data.content;
        api.sendMessage(respond, threadID, messageID);
      } catch (error) {
        api.sendMessage("Please say it again", threadID, messageID);
        api.setMessageReaction("🫀", event.messageID, (err) => {}, true);
      }
    }
  }
};