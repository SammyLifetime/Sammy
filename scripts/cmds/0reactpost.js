const axios = require('axios');

module.exports = {
  config: {
    name: "reactpost",
    aliases: ["raps"],
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "reactpost",
    longDescription: "bot react on the post",
    category: "admin",
    guide: "{pn}"
  },

  onStart: async ({ api, event, args }) => {
    const allTypes = ["unlike", "like", "love", "heart", "haha", "wow", "sad", "angry"];
    const postID = args[0];
    const type = args[1];
    if (!postID || !type) return api.sendMessage(global.utils.throwError(this.config.name, event.threadID, event.messageID));
    if (!allTypes.includes(type)) return api.sendMessage(`The reaction type is not valid, please choose one of the following styles: ${allTypes.join("/")}`, event.threadID, event.messageID);
    api.setPostReaction(Number(postID), type, (err, data) => {
      if (err) return api.sendMessage("Something went wrong, please check your postID and try again later", event.threadID, event.messageID);
      api.sendMessage(`Dropped emotion ${type} for posts with id ${postID}`, event.threadID, event.messageID);
    });
  }
};