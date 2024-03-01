module.exports = {
  config: {
    name: "tidlist",
    version: "1.0",
    author: "Samir B. Thakuri",
    countDown: 5,
    role: 1,
    shortDescription: {
      vi: "Hiển thị danh sách các nhóm",
      en: "Display a list of threads",
    },
    longDescription: {
      vi: "Module này được sử dụng để hiển thị danh sách tất cả các nhóm đang có trên hệ thống.",
      en: "This module is used to display a list of all threads currently on the system.",
    },
    category: "box chat",
    guide: {
      en: "   {pn}",
    },
  },

  onStart: async function ({ message, api, event, args, threadsData }) {
  try {
    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    let messageToSend = "List of threads:\n";
    for (let i = 0; i < threadList.length; i++) {
      const thread = threadList[i];
      messageToSend += `[${i + 1}] ${thread.name} => ${thread.threadID}\n`;
    }
    api.sendMessage(messageToSend, event.threadID);
  } catch (error) {
    console.error("Error retrieving thread data:", error);
  }
},

};
