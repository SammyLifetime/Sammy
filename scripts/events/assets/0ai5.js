var a = require("axios");

module.exports = {
 config: {
 name: "ai5",
 version: 1.6,
 author: "Jun",
 role: 0,
 shortDescription: "AI that can speak every language on Earth fluently",
 guide: "{pn} <query>",
 category: "AI"
 },
 onStart: function() {},
 onChat: async function({ message, api, event, args, usersData }) {

//this is optional 
var apikey = "open_ai_apikey"; 
var fbtoken = "token_fb"; 


 var prefix = ["ai","gpt","-ai"];
 var w = args[0];
w = w.toLowerCase();
 for (var i = 0; i < prefix.length; i++) {
 if (w.startsWith(prefix[i])) {
 try {
 var p = args.slice(1).join(" ");
 var id = event.senderID;
 var user = await usersData.get(id);
 var n = user.name;
 var tag = [{ id: id, tag: n }];
 var r = await a.post("https://gpt.jn-api.repl.co/api", {
 prompt: p,
 author: this.config.author,
 name: n,
 id: id,
 apikey: apikey,
 fbtoken: fbtoken
 });

var av = r.data.av
 var l = r.data.result.replace(/${name}/g, n);
 if (av) {
 message.reply({
 body: l,
 mentions: tag,
 attachment: await global.utils.getStreamFromURL(av)
 });
 } else {
 message.reply({
 body: l,
 mentions: tag
 });
 }
 } catch (error) {
 console.error(error);
 message.reply("An error occurred");
 }
 }
 }
 }
};