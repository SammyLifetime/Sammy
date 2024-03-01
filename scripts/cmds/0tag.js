 module.exports = {
  config: {
    name: "mention",
    aliases: ["tag"],
    version: "1.0",
    author: "Samir Œ",
    role: 0,
    shortDescription: {
      en: "Mention a user",
    },
    longDescription: {
      en: "Mention a user using their UID or link",
    },
    category: "mention",
    guide: {
      en: "{p}mention <uid/link> [text]",
      
    },
  },
  onStart: async function ({ event, message, args, usersData }) {
    const { senderID, messageReply } = event;
    let id;
    let text;

    const findUidFromLink = async (link) => {
      const { findUid } = global.utils;
      return await findUid(link);
    };

    if (args.length > 0) {
      const firstArg = args[0];

      if (/^(http|https):\/\/[^ "]+$/.test(firstArg)) {
        id = await findUidFromLink(firstArg);
        text = args.slice(1).join(" ");
      } else {
        id = parseInt(firstArg); 
        text = args.slice(1).join(" ");
      }
    } else if (messageReply && messageReply.senderID) {
      id = parseInt(messageReply.senderID); 
      text = args.join(" ");
    } else {
      id = parseInt(senderID); 
      text = args.join(" ");
    }

    const userData = await usersData.get(id);
    const name = userData.name;
    const mention = [{ id, tag: name }];

    try {
      await message.reply({
        body: `${name} ${text}`,
        mentions: mention,
      });
    } catch (error) {
      message.reply("Error while mentioning the user. Please try again later.");
    }
  },
};