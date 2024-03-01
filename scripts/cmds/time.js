const axios = require('axios');
module.exports = {
  config: {
    name: "time",
    alliases: ["date", "day"],
    version: "1.0",
    author: "Samir",
    countDown: 30,
    role: 0,
    shortDescription: "See Nepal's Current Time",
    longDescription: "See Nepal's Current Time",
    category: "General",
    guide: "{pn}"
  },
  
  onStart: async function ({ api, event, args }) {
  const res = await axios.get(`https://api-timezone.samirbadaila24.repl.co/timezone`);
  var year = res.data.year;
  var month = res.data.month;
  var day = res.data.day;
  var rank = res.data.rank;
  var time = res.data.time;
  return api.sendMessage(`Today's Date: ${year}-${month}-${day} \nDay: ${rank} \nTime: ${time}`, event.threadID, event.messageID);
}
};