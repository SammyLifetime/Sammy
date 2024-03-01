const axios = require('axios');

module.exports = {
  config: {
    name: "fbs",
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Get some basic information about a user."
    },
    longDescription: {
      en: "Get some basic information about a user"
    },
    category: "admin",
    guide: {
      en: "{pn} [ blank | reply | uid | mention ]"
    }
  },
  onStart: async function({ api, event, args }) {
    try {
      const { messageReply, senderID, threadID, messageID, type, mentions } = event;
      let uid;
      if (args.length > 0) {
        uid = args[0];
      } else if (type == "message_reply") {
        uid = messageReply.senderID;
      } else if (args.join().indexOf("@") !== -1) {
        uid = Object.keys(mentions)[0];
      } else {
        uid = senderID;
      }

      let data = await api.getUserInfo(uid);
      let { profileUrl, name, gender } = data[uid];
      const response = await axios.get(`https://golike.com.vn/func-api.php?user=${uid}`);
      let txt = "";
      if (response.data.status == 200) txt = `${response.data.data.date.replace(' ', ' | ')}`;
      else if (response.data.status == 404) txt = `Not found`;
      
      const profilePic = `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`;
      const genderText = gender == 2 ? "Male" : "Female";
      const message = {
        body: `❏Name: ${name}\❏Gender: ${genderText}\❏UID: ${uid}\❏Creation Date: ${txt}\❏Profile URL: ${profileUrl}\❏Profile Picture:`,
        attachment: await global.utils.getStreamFromURL(profilePic)
      };

      return api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("Something went wrong, try again later..", event.threadID);
    }
  }
};