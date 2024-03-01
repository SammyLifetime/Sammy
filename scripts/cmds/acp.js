const fs = require('fs');

module.exports = {
  config: {
    name: "acp",
    version: "1.0",
    author: "لوفي",
    shortDescription: {
      en: "Accept bot groups",
      vi: "Thêm hoặc xóa một thread ID từ threads.json"
    },
    longDescription: {
      en: "",
      vi: "Thêm hoặc xóa một thread ID từ threads.json. Sử dụng: /approve [add/delete] [thread ID]"
    },
    category: "owner",
    guide: {
      en: "{pn}accept add|delete (id)",
      vi: "Để sử dụng lệnh này, hãy gõ /approve [add/delete] [thread ID]"
    }
  },
  onStart: async function ({ message, args, threadsData, api }) {
    
    const threadsFile = 'threads.json';

    if (args.length < 1) {
      message.reply("Usage: /accept [add/delete] [ID set]");
      return;
    }

    const action = args[0];
    const threadId = args[1];
    const threadData = await threadsData.get(threadId);
    const threadName = threadData.threadName;

    let threads = [];
    try {
      threads = JSON.parse(fs.readFileSync(threadsFile));
    } catch (err) {
      console.error('', err);
    }

    if (action === "Add") {
      if (!threads.includes(threadId)) {
        threads.push(threadId);
        fs.writeFileSync(threadsFile, JSON.stringify(threads));
       message.reply(`The group${threadId} | ${threadName} It was accepted ✅`);
      } else {
       message.reply(`The group ${threadId} | ${threadName} Accepted successfully ✅`);
      }
    } else if (action === "Delete") {
      const index = threads.indexOf(threadId);
      if (index >= 0) {
        threads.splice(index, 1);
        fs.writeFileSync(threadsFile, JSON.stringify(threads));
        message.reply(`The group ${threadId} | ${threadName} has been removed ✅`);
        api.removeUserFromGroup(api.getCurrentUserID(), threadId);
      } else {
       message.reply(`The group ${threadId} | ${threadName} has been deleted successfully`, uid);
      }
    } else if (action === "existing") {
      let threadList = "";
      for (let i = 0; i < threads.length; i++) {
        const threadData = await threadsData.get(threads[i]);
        const name = threadData.threadName;
        threadList += `${i + 1}. ${name} (${threads[i]})`;
      }
      if (threadList === "") {
        message.reply("There are no accepted groups yet ❌");
      } else {
        message.reply(`Acceptable bot groups:${threadList}`);
      }
    }
  }
};