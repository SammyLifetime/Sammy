module.exports = {
  config: {
    name: "remainder",
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "task remainder like alarm",
    longDescription: "task remainder like alarm",
    category: "boxchat",
    guide: {
      en: "{p}{n} [Time] [Text]",
    },
  },

  onStart: async function ({ api, event, args, Users }) {
    const time = args[0];
    const text = args.slice(1).join(" ").replace(time, "");
    if (isNaN(time)) {
      return api.sendMessage(
        `How to use?\n/reminder <time> <txt>\n\nExample:\n/reminder 60 assignment make a powerful backend using NodeJs\n\nTake note:\n1 is equal to a second\n60 is equal to a minute \nTo make a minute remind please use long numbers\n\nExample for minutes:\n/reminder 99999 <txt>\n99999 is equal to 16 minutes`,
        event.threadID,
        event.messageID
      );
    }

    const display = time > 59 ? `${time / 60} minute` : `${time} second`;
    api.sendMessage(`I will remind you later\n${display}`, event.threadID, event.messageID);

    await new Promise(resolve => setTimeout(resolve, time * 1000));

    const threadInfo = await api.getThreadInfo(event.threadID);
    let value = threadInfo.nicknames[event.senderID];
    if (!value) {
      const userInfo = await Users.getInfo(event.senderID);
      value = userInfo.name;
    }

    const message = text ? `Dear ${value},\n\n You Set Remainder In Box\n𝗿𝗲𝗺𝗶𝗻𝗱𝗲𝗿:\n${text}` : `${value}, I think you asked me to remind you to do something, right?`;

    return api.sendMessage(
      {
        body: message,
        mentions: [
          {
            tag: value,
            id: event.senderID,
          },
        ],
      },
      event.threadID,
      event.messageID
    );
  },
};
