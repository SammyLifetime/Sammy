module.exports = {
 config: {
 name: "sms",
 aliases: ["anonymous", "anon"],
 version: "1.0",
 author: "Shinpei",
 countDown: 5,
 role: 2,
 shortDescription: {
 en: "Send anonymous message to user"
 },
 longDescription: {
 en: "Send anonymous message using thread or user ID"
 },
 category: "box chat",
 guide:{
 en: "{p}sms id text"
 }
 },
 onStart: async function ({ api, event, args }) {
 if (args.length < 2) {
 return api.sendMessage(
 "Syntax error, use: sms ID_BOX [message]",
 event.threadID,
 event.messageID
 );
 }

 const idBox = args[0];
 const message = args.slice(1).join(" ");

 api.sendMessage({
 body: message,
 mentions: [{
 tag: "@sms",
 id: event.senderID
 }]
 }, idBox, () => {
 api.sendMessage(
 `Sent message "${message}" to ${idBox} short messages`,
 event.threadID
 );
 });
 }
};