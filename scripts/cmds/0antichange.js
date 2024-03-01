const { getStreamFromURL } = global.utils;

module.exports = {
	config: {
		name: "antichange",
		version: "1.0",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: "Box chat information protection",
		longDescription: "Turn off the function of anti -member information to exchange your chat box information",
		category: "group chat",
		guide: "{pn} {{avt [on | off]}}: Prevention of avatar box chat"
			+ "\n{pn} {{name [on | off]}}: Box chat name protection"
			+ "\n{pn} {{theme [on | off]}}: Prevention of theme (theme) box chat"
			+ "\n{pn} {{emoji [on | off]}}: Prevent the status of Emoji Box Chat"
	},

	onStart: async function ({ message, event, args, threadsData }) {
		if (!["on", "off"].includes(args[1]))
			return message.SyntaxError();
		const { threadID } = event;
		const dataAntiChangeInfoBox = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
		async function checkAndSaveData(key, data, type) {
			dataAntiChangeInfoBox[key] = args[1] === "on" ? data : false;
			await threadsData.set(threadID, dataAntiChangeInfoBox, "data.antiChangeInfoBox");
			message.send(`Is already ${args[1] == "on" ? "tough" : "Turn off"} chPreventive function{type} box chat`);
		}
		switch (args[0]) {
			case "avt":
			case "avatar": {
				const { imageSrc } = await threadsData.get(threadID);
				if (!imageSrc)
					return message.send("Your chat box needs to book Avatar in advance");
				await checkAndSaveData("avatar", imageSrc, "avatar");
				break;
			}
			case "name": {
				const { threadName } = await threadsData.get(threadID);
				await checkAndSaveData("name", threadName, "Name");
				break;
			}
			case "theme": {
				const { threadThemeID } = await threadsData.get(threadID);
				await checkAndSaveData("theme", threadThemeID, "topic");
				break;
			}
			case "emoji": {
				const { emoji } = await threadsData.get(threadID);
				await checkAndSaveData("emoji", emoji, "emoji");
				break;
			}
			default: {
				return message.SyntaxError();
			}
		}
	},

	onEvent: async function ({ message, event, threadsData, role, api }) {
		const { threadID, logMessageType, logMessageData, author } = event;
		switch (logMessageType) {
			case "log:thread-image": {
				const imgURL = await threadsData.get(threadID, "data.antiChangeInfoBox.avatar");
				if (!imgURL)
					return;
				return async function () {
					if (role < 1 && api.getCurrentUserID() !== author) {
						message.reply(`Currently your chat box is enabling the ban on the exchange of avatars`);
						api.changeGroupImage(await getStreamFromURL(imgURL), threadID);
					}
					else {
						const imageSrc = logMessageData.url;
						await threadsData.set(threadID, imageSrc, "data.antiChangeInfoBox.avatar");
					}
				};
			}
			case "log:thread-name": {
				const name = await threadsData.get(threadID, "data.antiChangeInfoBox.name");
				if (name == false)
					return;
				return async function () {
					if (role < 1 && api.getCurrentUserID() !== author) {
						message.reply(`Currently your chat box is enabling the anti -member function to change the name of the group`);
						api.setTitle(name, threadID);
					}
					else {
						const threadName = logMessageData.name;
						await threadsData.set(threadID, threadName, "data.antiChangeInfoBox.name");
					}
				};
			}
			case "log:thread-color": {
				const themeID = await threadsData.get(threadID, "data.antiChangeInfoBox.theme");
				if (themeID == false)
					return;
				return async function () {
					if (role < 1 && api.getCurrentUserID() !== author) {
						message.reply(`Currently your chat box is enabling anti -members to change theme (topic)`);
						api.changeThreadColor(themeID || "196241301102133", threadID); // 196241301102133 is default color
					}
					else {
						const threadThemeID = logMessageData.theme_id;
						await threadsData.set(threadID, threadThemeID, "data.antiChangeInfoBox.theme");
					}
				};
			}
			case "log:thread-icon": {
				const emoji = await threadsData.get(threadID, "data.antiChangeInfoBox.emoji");
				if (emoji == false)
					return;
				return async function () {
					if (role < 1 && api.getCurrentUserID() !== author) {
						message.reply(`Currently your chat box is enabling the EMOJI -exchange member function`);
						api.changeThreadEmoji(emoji, threadID);
					}
					else {
						const threadEmoji = logMessageData.thread_icon;
						await threadsData.set(threadID, threadEmoji, "data.antiChangeInfoBox.emoji");
					}
				};
			}
		}
	}
};