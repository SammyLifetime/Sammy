const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "nsfw",
    aliases: "ns",
    version: "1.0",
    author: "SiAM | Samuel Kâñèñgeè",
    countDown: 5,
    category:"s",
    role: 2
  },

  onStart: async function({ api, args, message, event }) {
    const threadID = event.threadID;
    const approvedIDsPath = path.join(__dirname, "assist_json", "approved_ids.json");
    const pendingIDsPath = path.join(__dirname, "assist_json", "pending_ids.json");

    if (args[0] === "approved" && args[1]) {
      const id = args[1];
      const messageFromAdmin = args.slice(2).join(" ");

      let approvedIDs = JSON.parse(fs.readFileSync(approvedIDsPath));
      if (approvedIDs.includes(id)) {
        message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nThis thread ID is already approved\n\n╚════ஜ۩۞۩ஜ═══╝");
      } else {
        approvedIDs.push(id);
        fs.writeFileSync(approvedIDsPath, JSON.stringify(approvedIDs));
        api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\n📌 Request Accepted📌\nyour request has been approved by BotAdmin\nNow all NSFW commands will work for this thread.\n\nMessage from admin: ${messageFromAdmin}\n\n╚════ஜ۩۞۩ஜ═══╝`, id);
        message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nThis Thread has been approved now to use NSFW command\n\n If you don't know how to use this bot then join the Marin support Box \nType : sammygc\nto join.\n\n╚════ஜ۩۞۩ஜ═══╝");

        // Remove from pending IDs list
        let pendingIDs = JSON.parse(fs.readFileSync(pendingIDsPath));
        if (pendingIDs.includes(id)) {
          pendingIDs.splice(pendingIDs.indexOf(id), 1);
          fs.writeFileSync(pendingIDsPath, JSON.stringify(pendingIDs));
        }
      }
    } else if (args[0] === "remove" && args[1]) {
      const id = args[1];
      const reason = args.slice(2).join(" ");

      let approvedIDs = JSON.parse(fs.readFileSync(approvedIDsPath));
      if (!approvedIDs.includes(id)) {
        message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nthis thread id is not approved, so no need to remove \n\n╚════ஜ۩۞۩ஜ═══╝");
      } else {
        approvedIDs.splice(approvedIDs.indexOf(id), 1);
        fs.writeFileSync(approvedIDsPath, JSON.stringify(approvedIDs));
        api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\n⚠️Warning ⚠️\nNow this Thread ID's permission has been disapproved or removed to use NSFW commands by BotAdmin.\n\nReason: ${reason}\nContact King Monsterwith also known as Samuel Kâñèñgeè for more \nFB: fb.me//100088353639740\n\n╚════ஜ۩۞۩ஜ═══╝`, id);
        message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nThe thread ID has been removed from using NSFW commend\n\n╚════ஜ۩۞۩ஜ═══╝");
      }



                      } else if (args[0] === "disapproved" && args[1] && args[2]) {
      const id = args[1];
      const reason = args.slice(2).join(" ");

      let pendingIDs = JSON.parse(fs.readFileSync(pendingIDsPath));
      if (!pendingIDs.includes(id)) {
        message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nThis thread ID is not pending approval.\n\n╚════ஜ۩۞۩ஜ═══╝");
      } else {
        // Remove from pending IDs list
        pendingIDs.splice(pendingIDs.indexOf(id), 1);
        fs.writeFileSync(pendingIDsPath, JSON.stringify(pendingIDs));
        api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\n⚠️ Warning ⚠️\nYour thread ID's permission to use NSFW commands has been disapproved by BotAdmin.\n\nReason: ${reason}\nContact King Monsterwith Also known as Samuel Kâñèñgeè for more information.\nFB: fb.me//100088353639740\n\njoin the Sammy support Box for fast reply\nType : support \nto join.\n\n╚════ஜ۩۞۩ஜ═══╝`, id);
        message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nThe thread ID has been disapproved for using NSFW commands.\n\n╚════ஜ۩۞۩ஜ═══╝");
          }
      




      
    } else if (args[0] === "check") {
      let approvedIDs = JSON.parse(fs.readFileSync(approvedIDsPath));
      if (approvedIDs.includes(threadID)) {
        message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nNSFW is currently on for this thread.\n\n╚════ஜ۩۞۩ஜ═══╝");
      } else {
        message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nNSFW is currently off for this thread.\n\n╚════ஜ۩۞۩ஜ═══╝");
      }
    } else {
      message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\nInvalid command usage. Use "help nsfw" to see how to use this command.\n\n╚════ஜ۩۞۩ஜ═══╝`);
    }
  },
};