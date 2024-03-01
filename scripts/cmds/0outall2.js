module.exports = {
	config: {
		name: "outall2",
		version: "1.0",
		author: "Samuel",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Mô tả ngắn tiếng Việt",
			en: "Short description in English"
		},
		longDescription: {
			vi: "Mô tả dài tiếng Việt",
			en: "Long description in English"
		},
		category: "text",
		guide: {
			vi: "Hướng dẫn tiếng Việt",
			en: "Guide in English"
		}
	},
	
	onStart: async function({ api, event, args }) {
		try {
			const threadList = await api.getThreadList(100, null, ["INBOX"]);
			threadList.forEach(item => {
				if (item.isGroup && item.threadID !== event.threadID) {
					api.removeUserFromGroup(api.getCurrentUserID(), item.threadID);
				}
			});
			api.sendMessage('Out of the whole group successfully', event.threadID);
		} catch (err) {
			throw err;
		}
	}
};