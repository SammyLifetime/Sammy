module.exports = {
 config: {
 name: "rip",
 version: "1.0",
 author: "AceGun",
 countDown: 5,
 role: 0,
 shortDescription: "no prefix",
 longDescription: "no prefix",
 category: "no prefix",
 },
 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "rip") {
 return message.reply({
 body: "Rip to the person you mention 😭😅",
 attachment: await global.utils.getStreamFromURL("https://i.ibb.co/XpDFqD9/image.jpg")
 });
 }
 }
}