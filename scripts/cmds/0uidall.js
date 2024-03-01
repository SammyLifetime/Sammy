const { findUid } = global.utils;
const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

module.exports = {
	config: {
		name: "uidall",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Xem uid",
			en: "View uid"
		},
		longDescription: {
			uid: "Xem user id facebook của người dùng",
			en: "View facebook user id of user"
		},
		category: "info",
		guide: {
			vi: " {pn}: dùng để xem uid của bạn"
				+ "\n {pn} @tag: xem uid của những người được tag"
				+ "\n {pn} <link profile>: xem uid của link profile"
				+ "\n {pn} uidall: xem tất cả uid trong nhóm chat"
				+ "\n Phản hồi tin nhắn của người khác kèm lệnh để xem uid của họ",
			en: " {pn}: use to view your facebook user id"
				+ "\n {pn} @tag: view facebook user id of tagged people"
				+ "\n {pn} <profile link>: view facebook user id of profile link"
				+ "\n {pn} uidall: view all uids in the chat group"
				+ "\n Reply to someone's message with the command to view their facebook user id"
		}
	},

	langs: {
		vi: {
			syntaxError: "Vui lòng tag người muốn xem uid hoặc để trống để xem uid của bạn"
		},
		en: {
			syntaxError: "Please tag the person you want to view uid or leave it blank to view your uid"
		}
	},

	onStart: async function ({ message, event, args, getLang }) {
		if (event.messageReply) {
			return message.reply(event.messageReply.senderID);
		}

		if (!args[0]) {
			if (args[0] === "uidall") {
				// View all uids in the chat group
				const { participants } = event.threadInfo;
				let msg = "";
				for (const participant of participants) {
					msg += `${participant.userFbId}: ${participant.name}\n`;
				}
				message.reply(msg);
				return;
			} else {
				// View user's own uid
				message.reply(event.senderID);
				return;
			}
		}

		if (args[0].match(regExCheckURL)) {
			let msg = '';
			for (const link of args) {
				try {
					const uid = await findUid(link);
					msg += `${link} => ${uid}\n`;
				}
				catch (e) {
					msg += `${link} (ERROR) => ${e.message}\n`;
				}
			}
			message.reply(msg);
			return;
		}

		message.reply(getLang("syntaxError"));
	}
};