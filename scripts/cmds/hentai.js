const axios = require('axios');
const fs = require("fs-extra");

module.exports = {
	config: {
		name: "hentai",
		aliases: ["nsfw"],
		version: "1.0",
		author: "MILAN",
		countDown: 5,
		role: 0,
		shortDescription: "get nsfw images",
		longDescription: "",
		category: "adult ",
		guide: {
			vi: "{p} hentai",
			en: "{p} hentai"
		}
	},

	onStart: async function ({ message, args, event, api }){
    const permission = ["100088353639740"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nOnly King Monsterwith has permission.\n\n╚════ஜ۩۞۩ஜ═══╝", event.threadID, event.messageID);
    return;
  }
	try {
 const { data } = await axios.get("https://milanbhandari.imageapi.repl.co/nsfw?apikey=xyzmilan");
 const url = await axios.get(data.url, { responseType: "arraybuffer" });
 fs.writeFileSync(__dirname + "/tmp/nsfw.png", Buffer.from(url.data, "utf-8"));
 const msg = "";
 const Img = [
 fs.createReadStream(__dirname + "/tmp/nsfw.png")
 ];
 return api.sendMessage({
 body: msg,
 attachment: Img
 }, event.threadID, event.messageID);
 } catch (error) {
 console.error(error);
  }
  }
};