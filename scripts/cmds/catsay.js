const request = require("request");
const fs = require("fs-extra");
module.exports = {
  config: {
    name: "catsay",
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "catsay",
    longDescription: "catsay",
    category: "utility",
  }, 
  onStart: async function({api, event, args}) {
  const { threadID, messageID, senderID, body } = event;
	let text = args.toString().replace(/,/g,  '  ');
if (!text)
    return api.sendMessage("Enter Text lmao..", event.threadID, event.messageID);

	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/cat.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/cat.png"),event.messageID);
	 return request(encodeURI(`https://cataas.com/cat/cute/says/${text}`)).pipe(fs.createWriteStream(__dirname+'/cache/cat.png')).on('close',() => callback());
  }
};
