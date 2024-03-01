const axios = require("axios");
module.exports = {
 config: {
 name: "dice",
 aliases: ["dc"],
 version: "1.0",
 author: "Jun",
 countDown: 5,
 role: 0,
 shortDescription: "have fun",
 longDescription: {
 en: " ",
 },
 category: "game",
 guide: {
 en: "",
 },
 },
 onStart: async function ({ api, event, args, usersData, message }) {
const { getPrefix } = global.utils;
  const p = getPrefix(event.threadID);
 const user = event.senderID;
 const userData = await usersData.get(event.senderID);
 const dice = parseInt(args[0]);
 const betAmount = parseInt(args[1]);
 if (isNaN(dice) || dice < 1 || dice > 6) {
 message.reply(`Invalid choice. Please choose a number between 1 and 6 only.\${p}dice <dice num> <bet amount>\\example usage: ${p}dice 3 1000`);
 return;
 }
 if (isNaN(betAmount) || betAmount <= 0) {
 message.reply(`Invalid bet amount. Please enter a valid bet amount.\${p}dice <dice num> <bet amount>\\example usage: ${p}dice 3 1000`);
 return;
 }
 const userMoney = userData.money; 
 if (userMoney < betAmount) { 
 return message.reply("You don't have enough balance to make a bet bro😕");
 }
 try {
const response = await axios.get(`https://photooxy-api-by-faheem.replit.app/api/randomgambar/dadu=${dice}&amount=${betAmount}`);
const { message: reply, result: { selectedNumber, dice: { imglink } } } = response.data;
if (reply.includes("Congratulations!")) {
  const winAmount = parseInt(reply.match(/\+/)[0]);
  userData.money += winAmount;
  await usersData.set(event.senderID, userData);
} else {
  userData.money -= betAmount;
  await usersData.set(event.senderID, userData);
}
message.reply({
  body: reply,
  attachment: await global.utils.getStreamFromURL(imglink),
});
} catch (error) {
  console.error(error);
  message.reply("error bro api sucks🥲.");
}
},
};