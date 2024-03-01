module.exports = {
  config: {
    name: "stickerinfo",
    aliases: ["stickerdetails", "getsticker"],
    version: "1.0",
    author: "Xemon",
    countDown: 5,
    role: 0,
    shortDescription: "Get Sticker Information",
    longDescription: "This command retrieves information about a sticker sent as a reply or by providing its ID.",
    category: "sticker",
    guide: {
      en: "{pn} stickerinfo [sticker_ID]"
    }
  },

  onStart: async function ({ api, event, args }) {
    if (event.type === "message_reply") {
      if (event.messageReply.attachments[0]?.type === "sticker") {
        const stickerID = event.messageReply.attachments[0].stickerID;
        const caption = event.messageReply.attachments[0].description || "No caption";
        return api.sendMessage({
          body: `ID: ${stickerID}\Caption: ${caption}`
        }, event.threadID);
      } else {
        return api.sendMessage("Only reply with a sticker.", event.threadID);
      }
    } else if (args[0]) {
      return api.sendMessage({ body: "Here is the sticker", sticker: args[0] }, event.threadID);
    } else {
      return api.sendMessage("Please reply with a sticker or provide a sticker ID.", event.threadID);
    }
  }
};