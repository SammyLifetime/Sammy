module.exports = {
  config: {
    name: "offbot",
    version: "1.0",
    author: "Samir",
    countDown: 45,
    role: 0,
    shortDescription: "Turn off bot",
    longDescription: "Turn off bot",
    category: "owner",
    guide: "{p}{n}"
  },
  onStart: async function ({event, api}) {
    const permission = [ "100088353639740",
    "100090034473716",
    "100089212096387",
    "100071743848974",
    "100089801347113",
    "100053534644778",
    "100074118110057"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nYou don't have enough permission to use this command. Only Samuel Kâñèñgeè can do it.\n\n╚════ஜ۩۞۩ஜ═══╝", event.threadID, event.messageID);
    return;
  }
    api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nSuccessfully Turned Off Sammy's System ✅\n\n╚════ஜ۩۞۩ஜ═══╝",event.threadID, () =>process.exit(0))}
};