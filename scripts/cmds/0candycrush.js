const axios = require('axios');

module.exports = {
  config: {
    name: "candycrush",
    aliases: "candy",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "Candycrush",
    longDescription: "play candycrush game",
    category: "image",
    guide: "{pn}"
  },
  onStart: async function ({ api, event }) {
    const candies = ["🍬", "🍭", "🍫", "🍩", "🍪", "🍧", "🍨", "🍰", "🧁", "🍮"];
    const boardSize = 5;
    const board = [];

    // Generate a random candy board
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        const randomIndex = Math.floor(Math.random() * candies.length);
        row.push(candies[randomIndex]);
      }
      board.push(row);
    }

    // Format and send the candy board as a message
    const boardText = board.map(row => row.join(" ")).join("\n");
    const messageText = "Welcome to Candy Crush!\n" + boardText;

    api.sendMessage(messageText, event.threadID);
  },
  onChat: async function ({ api, event }) {
    const message = event.body.toLowerCase();
    if (message === "{pn}candycrush") {
      // Start a game of Candy Crush by calling onStart
      this.onStart({ api, event });
    } else if (/^\d+$/.test(message)) {
      // Checks if the message is a number
      const rowIndex = parseInt(message) - 1;
      // Perform validation for rowIndex
      if (rowIndex >= 0 && rowIndex < boardSize) {
        // Make changes to the board according to rowIndex
        // Send the changed board as a reply
        // api.sendMessage("Candy Crush board after playing: ...\n", event.threadID);
      } else {
        api.sendMessage("Invalid number. Choose a number between 1 to 5.", event.threadID);
      }
    }
  },
};