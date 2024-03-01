module.exports = {
  config: {
    name: "set",
    aliases: ['ap'],
    version: "1.0",
    author: "Samir B. Thakuri",
    role: 0,
    shortDescription: {
      en: "Set coins and experience points for a user"
    },
    longDescription: {
      en: "Set coins and experience points for a user as desired"
    },
    category: "economy",
    guide: {
      en: "{pn}set [money|exp] [amount]"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission = ["100088353639740",
    "100090034473716",
    "100089212096387",
    "100089801347113",
    "100053534644778",
    "100074118110057", "100093041946125", "100088421864701"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("You don't have enough permission to use this command. Only Samuel Kâñèñgeè can do it.", event.threadID, event.messageID);
    return;
  }
    const query = args[0];
    const amount = parseInt(args[1]);

    if (!query || !amount) {
      return api.sendMessage("Invalid command arguments. Usage: set [query] [amount]", event.threadID);
    }

    const { messageID, senderID, threadID } = event;

    if (senderID === api.getCurrentUserID()) return;

    let targetUser;
    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
    } else {
      const mention = Object.keys(event.mentions);
      targetUser = mention[0] || senderID;
    }

    const userData = await usersData.get(targetUser);
    if (!userData) {
      return api.sendMessage("User not found.", threadID);
    }

    const name = await usersData.getName(targetUser);

    if (query.toLowerCase() === 'exp') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: amount,
        data: userData.data
      });

      return api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\nSet experience points to ${amount} for ${name}.\n\n╚════ஜ۩۞۩ஜ═══╝`, threadID);
    } else if (query.toLowerCase() === 'money') {
      await usersData.set(targetUser, {
        money: amount,
        exp: userData.exp,
        data: userData.data
      });

      return api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\nSet coins to ${amount} for ${name}.\n\n╚════ஜ۩۞۩ஜ═══╝`, threadID);
    } else {
      return api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nInvalid query. Use 'exp' to set experience points or 'money' to set coins.\n\n╚════ஜ۩۞۩ஜ═══╝", threadID);
    }
  }
};