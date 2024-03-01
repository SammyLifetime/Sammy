const fs = require("fs");
const path = require("path");
const { config } = global.GoatBot;

const pendingIDsPath = path.join(__dirname, "assist_json", "pending_main.json");
const approvedIDsPath = path.join(__dirname, "assist_json", "approved_main.json");

module.exports = {
	config: {
		name: "requestMAIN",
		version: "1.1",
		author: "SiAM",
		countDown: 5,
		category: "Utility",
    role: 0,
    guide: {
      en: "{pn} Your <message for admin> "
    }
	},

	onStart: async function ({ api, args, event, threadsData }) {
    const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);
		const threadID = event.threadID;
		const senderID = event.senderID;
		const threadInfo = await api.getThreadInfo(threadID);

		// Check if the thread ID is already approved
		if (fs.existsSync(approvedIDsPath)) {
			const approvedIDs = JSON.parse(fs.readFileSync(approvedIDsPath));
			if (approvedIDs.includes(threadID)) {
				const approvalMsg = "╔════ஜ۩۞۩ஜ═══╗\n\nNo need for approval. This thread is already approved to use all main  command from the bot.\n\n If you don't know how to use this bot then join the Sammy support Box \nType : support \nto join.\n\n╚════ஜ۩۞۩ஜ═══╝";
				api.sendMessage(approvalMsg, threadID);
				return;
			}
		}

		// Check if the thread ID is already pending
		if (fs.existsSync(pendingIDsPath)) {
			const pendingIDs = JSON.parse(fs.readFileSync(pendingIDsPath));
			if (pendingIDs.includes(threadID)) {
				const pendingMsg = "╔════ஜ۩۞۩ஜ═══╗\n\nYour request to use bot main cmds is already in pending.... \nPlease contact Samuel Kâñèñgeè for approval.\n\n Facebook: Fb.me//100088353639740\n\nalso you can join  Sammy support Box for help\nType : ${p} Sammygc or ${p} gc \nto join.\n\n╚════ஜ۩۞۩ஜ═══╝";
				api.sendMessage(pendingMsg, threadID);
				return;
			}
		} else {
			// If the file doesn't exist, create an empty array
			fs.writeFileSync(pendingIDsPath, "[]");
		}

		// Check if the user provided a message for the admin
		const userMessage = args.join(" ");
		if (!userMessage) {
			const messageReminder = `╔════ஜ۩۞۩ஜ═══╗\n\nPlease add a message for the admin. \n\nExample:\n ${p} requestMAIN yourmessage\n\n╚════ஜ۩۞۩ஜ═══╝`;
			api.sendMessage(messageReminder, threadID);
			return;
		}

		// Store the thread ID in the pending list
		const pendingIDs = JSON.parse(fs.readFileSync(pendingIDsPath));
		pendingIDs.push(threadID);
		fs.writeFileSync(pendingIDsPath, JSON.stringify(pendingIDs));

		const msg = `╔════ஜ۩۞۩ஜ═══╗\n\n------MAIN BoT RQ------\n\nThread ID: ${threadID}\nThread Type: ${threadInfo.isGroup ? "Group" : "User"}\n${threadInfo.isGroup ? `Group Name: ${threadInfo.name}\n\nRequester ID: ${senderID}\nRequester Name: ${await getUserName(api, senderID)}` : `User Name: ${await getUserName(api, senderID)}`}\n\nMessage: ${userMessage}\n\n╚════ஜ۩۞۩ஜ═══╝`;
for (const adminID of config.adminBot) {
  api.sendMessage(msg, adminID);
}
    

		const notifyMsg = `╔════ஜ۩۞۩ஜ═══╗\n\n✅Your approval request for using Bot's main cmds has been sent to admin Samuel Kâñèñgeè with this\nmessage: ${userMessage}.\n\n I will notify you if your thread is approved. Please wait until then.\n\n join the Marin support Box if you facing any problem\nType : ${p} sammygc or ${p} gc \nto join.\n\n╚════ஜ۩۞۩ஜ═══╝`;
		api.sendMessage(notifyMsg, threadID);
	}
};

async function getUserName(api, userID) {
	const user = await api.getUserInfo(userID);
	return user[userID].name;
}
