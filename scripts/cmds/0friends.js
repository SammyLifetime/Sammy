module.exports = {
	config: {
		name: "friends",
		version: "1.0",
		author: "Samuel Kâñèñgeè",
		countDown: 5,
		role: 0,
		shortDescription: "",
		longDescription: "",
		category: "owner",
		guide: "{pn}"
	},
	onStart: async ({ event, api, args }) => {
		try {
			var listFriend = [];
			var dataFriend = await api.getFriendsList();
			var countFr = dataFriend.length;

			for (var friends of dataFriend) {
				listFriend.push({
					name: friends.fullName || "Unnamed",
					uid: friends.userID,
					gender: friends.gender,
					vanity: friends.vanity,
					profileUrl: friends.profileUrl
				});
			}

			var nameUser = [];
			var urlUser = [];
			var uidUser = [];
			var page = 1;
			page = args[0] ? parseInt(args[0]) : 1;
			if (page < 1) page = 1;
			var limit = 10;
			var msg = `You have ${countFr} friend/s\n\n`;
			var numPage = Math.ceil(listFriend.length / limit);

			for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
				if (i >= listFriend.length) break;
				let infoFriend = listFriend[i];
				msg += `${i + 1}. ${infoFriend.name}\nID: ${infoFriend.uid}\nGender: ${infoFriend.gender}\nVanity: ${infoFriend.vanity}\nFacebook Link: ${infoFriend.profileUrl}\n\n`;
				nameUser.push(infoFriend.name);
				urlUser.push(infoFriend.profileUrl);
				uidUser.push(infoFriend.uid);
			}

			msg += `Page ${page}/${numPage}\nUse ${global.config.PREFIX}friend number/all\n\n`;

			return api.sendMessage(msg + `Reply with the number of your friend if you want to remove it. You can also unfriend multiple using (1, 2, 3, etc.)`, event.threadID, (e, data) =>
				global.client.handleReply.push({
					name: this.config.name,
					author: event.senderID,
					messageID: data.messageID,
					nameUser,
					uidUser,
					type: 'reply'
				})
			);
		} catch (e) {
			console.error(e);
		}
	}
};