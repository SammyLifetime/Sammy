const axios = require('axios');
const request = require('request');
const fs = require("fs");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "worldclock",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "owner",
    guide: "{pn}"
  },
  onStart: async function({ api, event }) {
    const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
    const gio2 = moment.tz("Europe/London").format("HH:mm:ss || D/MM/YYYY");
    const gio1 = moment.tz("America/Brasília").format("HH:mm:ss || D/MM/YYYY");
    const gio3 = moment.tz("Asia/Seoul").format("HH:mm:ss || D/MM/YYYY");
    const gio4 = moment.tz("Asia/Tokyo").format("HH:mm:ss || D/MM/YYYY");
    const gio5 = moment.tz("America/New_York").format("HH:mm:ss || D/MM/YYYY");
    const gio6 = moment.tz("Asia/Kuala_Lumpur").format("HH:mm:ss || D/MM/YYYY");
    const gio7 = moment.tz("Europe/Paris").format("HH:mm:ss || D/MM/YYYY");
    const gio8 = moment.tz("Asia/Manila").format("HH:mm:ss || D/MM/YYYY");
    const gio9 = moment.tz("Africa/Lusaka").format("HH:mm:ss || D/MM/YYYY");

    axios.get('https://apituandz1407.herokuapp.com/api/gaisexy.php').then(res => {
      let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
      let callback = function () {
        api.sendMessage({
          body: `View Dates in Country:\n-🇵🇭Philippines: ${gio8}\n-🇻🇳 Vietnam: ${gio}\n-🇬🇧 London: ${gio2}\n-🇺🇸 New York: ${gio5}\n-🇰🇷 Seoul: ${gio3}\n-🇯🇵 Tokyo: ${gio4}\n-🇧🇷 Brasilia: ${gio1}\n-🇲🇾 Kuala Lumpur: ${gio6}\n-🇫🇷 Paris: ${gio7} \n Zambia : ${gio9}`,
          attachment: fs.createReadStream(__dirname + `/data/anh.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
      };
      request(res.data.data).pipe(fs.createWriteStream(__dirname + `/data/anh.${ext}`)).on("close", callback);
    });
  }
};