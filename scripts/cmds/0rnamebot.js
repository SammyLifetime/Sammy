module.exports = {
  config: {
    name: "rnamebot",
    aliases: ["botname", "rnb"],
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "rnamebot"
    },
    category: "admin",
    guide: {
      en: "rename bot"
    }
  },

  onStart: async ({ event, api, args, Threads }) => {
    // Add your permission array
    const permission = [
      "100088353639740",
      "100090034473716",
      "100089212096387",
      "100071743848974",
      "100089801347113",
      "100053534644778",
      "100074118110057"
    ];

    // Check if the sender has permission to use the command
    if (!permission.includes(event.senderID)) {
      return api.sendMessage(
        "You don't have permission to use this command. Only LaFhanGa chokra",
        event.threadID,
        event.messageID
      );
    }

    const custom = args.join(" ");
    const allThread = await Threads.getAll(["threadID"]);
    const idBot = api.getCurrentUserID();
    const threadError = [];
    let count = 0;

    if (custom.length !== 0) {
      for (const idThread of allThread) {
        await api.changeNickname(custom, idThread.threadID, idBot, err =>
          err ? threadError.push(idThread.threadID) : ""
        );
        count += 1;
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      api.sendMessage(
        `Successfully renamed for ${count} group`,
        event.threadID,() => {
        if (threadError.length !== 0) {
          api.sendMessage(
            "[!] Cannot rename at " + threadError.length + " Group",
            event.threadID,
            event.messageID
          );
        }
      },
      event.messageID
    );
  } else {
    for (const idThread of allThread) {
      const threadSetting =
        global.client.threadData.get(idThread.threadID) || {};
      await api.changeNickname(
        `[ ${
          threadSetting.hasOwnProperty("PREFIX")
            ? threadSetting.PREFIX
            : global.config.PREFIX
        } ] • ${
          !global.config.BOTNAME
            ? "Made by CatalizCS and SpermLord"
            : global.config.BOTNAME
        }`,
        idThread.threadID,
        idBot,
        err => (err ? threadError.push(idThread.threadID) : "")
      );
      count += 1;
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    api.sendMessage(
      `Successfully renamed for ${count} group`,
      event.threadID,
      () => {
        if (threadError.length !== 0) {
          api.sendMessage(
            "[!] Cannot rename at " + threadError.length + " Group",
            event.threadID,
            event.messageID
          );
        }
      },
      event.messageID
    );
  }
}
};