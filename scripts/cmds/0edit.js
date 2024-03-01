module.exports = {
    config: {
        name: "edit",
        version: "1.0",
        author: "Cruizex",
        shortDescription: {
            en: "Edit a message",
        },
        longDescription: {
            en: "Edit a bot-generated message when replied with the command 'edit <new message>'.",
        },
        category: "utility",
        guide: {
            en: "Reply to a bot-generated message with 'edit <new message>'.",
        },
    },

    langs: {
        en: {
            syntaxError: "Invalid syntax. Reply to a bot-generated message with 'edit <new message>'.",
            editSuccess: "Edited ✅",
        },
    },

    onStart: async function ({ message, event, api, getLang }) {
        console.log("Entered onStart");
        console.log("event.messageReply:", event.messageReply);

        if (!event.messageReply || event.messageReply.senderID !== api.getCurrentUserID()) {
            console.log("Returning syntaxError");
            return message.reply(getLang("syntaxError"));
        }

        const newMessage = event.body.substring(event.body.indexOf(" ") + 1);
        await api.editMessage(newMessage, event.messageReply.messageID);
        console.log("Message edited successfully");
        message.reply(getLang("editSuccess"));
    },
};