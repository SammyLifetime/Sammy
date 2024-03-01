module.exports = {
  config: {
    name: "botnick",
    aliases: ["botname"],
    version: "1.0",
    author: "Xemon",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Change nickname of the bot in all group chats"
    },
    longDescription: {
      en: "Change nickname of the bot in all group chats"
    },
    category: "owner",
    guide: {
      en: "{pn} <new nickname>"
    },
    envConfig: {
      delayPerGroup: 250
    }
  },

  langs: {
    en: {
      missingNickname: "╔════ஜ۩۞۩ஜ═══╗\n\nPlease enter the new nickname for the bot\n\n╚════ஜ۩۞۩ஜ═══╝",
      changingNickname: "╔════ஜ۩۞۩ஜ═══╗\n\nStart changing bot nickname to '%1' in %2 group chats\n\n╚════ஜ۩۞۩ஜ═══╝",
      errorChangingNickname: "╔════ஜ۩۞۩ஜ═══╗\n\nAn error occurred while changing nickname in %1 groups:\n%2\n\n╚════ஜ۩۞۩ஜ═══╝",
      successMessage: "╔════ஜ۩۞۩ஜ═══╗\n\n✅ Successfully changed nickname in all group chats to '%1'\n\n╚════ஜ۩۞۩ஜ═══╝",
      sendingNotification: "╔════ஜ۩۞۩ஜ═══╗\n\nSending notification to %1 group chats.\n\n╚════ஜ۩۞۩ஜ═══╝"
    }
  },

  onStart: async function({ api, args, threadsData, message, getLang }) {
    const newNickname = args.join(" ");

    if (!newNickname) {
      return message.reply(getLang("invalidInput"));
    }

    const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
    const threadIds = allThreadID.map(thread => thread.threadID);

    const nicknameChangePromises = threadIds.map(async threadId => {
      try {
        await api.changeNickname(newNickname, threadId, api.getCurrentUserID());
        return threadId;
      } catch (error) {
        console.error(`Failed to change nickname for thread ${threadId}: ${error.message}`);
        return null;
      }
    });

    const failedThreads = (await Promise.allSettled(nicknameChangePromises))
      .filter(result => result.status === "rejected")
      .map(result => result.reason.message);

    if (failedThreads.length === 0) {
      message.reply(getLang("successMessage", newNickname));
    } else {
      message.reply(getLang("partialSuccessMessage", newNickname, failedThreads.join(", ")));
    }
    message.reply(getLang("sendingNotification", allThreadID.length));
  }
};