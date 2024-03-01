const axios = require('axios');

module.exports = {
 config: {
 name: "monthly",
 version: "1.0",
 author: "Samuel Kâñèñgeè",
 countDown: 5,
 role: 0,
 shortDescription: "monthly",
 longDescription: "Monthly rewards",
 category: "economy",
 guide: "{pn}"
 },
 onStart: async ({ api, event, Currencies }) => {
 const { threadID, senderID } = event;
 const data = (await Currencies.getData(senderID)).data || {};

 const cooldownTime = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
 const rewardCoin = 750000; // amount of reward coin

 if (data.monthlyCoolDown && Date.now() - data.monthlyCoolDown < cooldownTime) {
 const remainingTime = data.monthlyCoolDown + cooldownTime - Date.now();
 const days = Math.floor(remainingTime / 86400000);
 const hours = Math.floor((remainingTime % 86400000) / 3600000);
 const minutes = Math.floor((remainingTime % 3600000) / 60000);
 const seconds = Math.floor((remainingTime % 60000) / 1000);
 const cooldownMessage = `You received your monthly reward, please come back after: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds.`;

 return api.sendMessage(cooldownMessage, threadID);
 }

 await Currencies.increaseMoney(senderID, rewardCoin);
 data.monthlyCoolDown = Date.now();
 await Currencies.setData(senderID, data);

 const rewardedMessage = `You received $${rewardCoin}, to continue to receive, please try again after 30 days`;
 api.sendMessage(rewardedMessage, threadID);

 const imageResponse = await axios.get("https://i.imgur.com/3kUFK23.gif", {
 responseType: "stream"});

 api.sendMessage({
 attachment: imageResponse.data
 }, threadID, () => {});
 }
};