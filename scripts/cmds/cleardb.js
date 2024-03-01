module.exports = {
  config: {
    name: "cleardb",
    version: "1.0",
    author: "Xemon—",
    role: 2,
    shortDescription: {
      en: "Clears the group database",
      vi: "Xóa cơ sở dữ liệu nhóm"
    },
    longDescription: {
      en: "This command clears the database of all groups.",
      vi: "Lệnh này xóa cơ sở dữ liệu của tất cả các nhóm."
    },
    category: "Admin"
  },

  async onStart({ threadsData, api, message }) {
    try {
      // Retrieve all threads
      const allThreads = await threadsData.getAll();

      // Perform the necessary actions to clear the group database
      for (const thread of allThreads) {
        try {
          await threadsData.remove(thread.threadID);
        } catch (error) {
          console.error(`Failed to remove thread ${thread.threadID}: ${error}`);
        }
      }

      console.log("Group database cleared successfully.");
      api.sendMessage("Group database has been cleared successfully.", message.threadID);
    } catch (error) {
      console.error("An error occurred while clearing the group database:", error);
      api.sendMessage("An error occurred while clearing the group database. Please try again later.", message.threadID);
    }
  }
};