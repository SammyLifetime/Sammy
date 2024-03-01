
const axios = require("axios");

module.exports = {
  config: {
    name: "ttt2",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "",
    guide: {
      en: "{p}{n}",
    }
  },

  onStart: async function ({ api, event, args }) {
    const { body, threadID } = event;
    if (body === "reset" && threadID) {
      try {
        await axios.get(`https://api-test.yourboss12.repl.co/api/others/gpt/reset?id=${threadID}`);
        api.sendMessage("Conversation reset successfully", threadID);
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      const prompt = args.join(" ");
      try {
        const response = await axios.get(`https://api-test.yourboss12.repl.co/api/others/gpt?prompt=${prompt}&id=${threadID}`);
        api.sendMessage(response.data.content, threadID);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  },

  onReply: async function ({ event, handleReply, args }) {
    const { body, senderID, threadID } = event;
    if (!global.moduleData.tictactoe) global.moduleData.tictactoe = new Map();
    let data = global.moduleData.tictactoe.get(threadID);
    if (!data || data.gameOn == false) return;
    var number = parseInt(body);
    if (!isNaN(number) && number > 0 && number < 10) {
      var row = number < 4 ? 0 : number < 7 ? 1 : 2;
      var col = number % 3 == 0 ? 2 : (number - 1) % 3;
      var temp = move(row, col, data);
      var lmao = "";
      if (checkGameOver(data)) {
        var gayban = ["chicken 😎", "You should quit😜", "You're still a noobie😎", "a bit immature 😎", "Oh my🤭 what a loss!", "easy game 😎"];
        if (checkAIWon(data)) lmao = `You lose! ${gayban[Math.floor(Math.random() * gayban.length)]}`;
        else if (checkPlayerWon(data)) lmao = "You win! :<";
        else lmao = "It's tied!";
        global.moduleData.tictactoe.delete(threadID);
      }
      var msg = lmao !== "" ? lmao : temp == undefined ? "Reply number of cells to check" : temp;
      event.api.sendMessage({ body: msg, attachment: await displayBoard(data) }, threadID, (error, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          author: senderID,
          messageID: info.messageID
        })
      }, event.messageID);
    } else return event.api.sendMessage("Invalid cell number!", threadID, event.messageID);
  }
};
