const fs = require('fs-extra');
const pathFile = __dirname + '/cache/echo.txt';

if (!fs.existsSync(pathFile))
    fs.writeFileSync(pathFile, 'false');

module.exports = {
    config: {
        name: "echo",
        version: "1.0.0",
        hasPermssion: 1,
        credits: "Samuel Kâñèñgeè",
        description: "Enable/disable echo",
        commandCategory: "...",
        usages: "on/off",
        cooldowns: 0
    },

    onChat: async function ({ api, event, args }) {
        const isEnable = fs.readFileSync(pathFile, 'utf-8');
        const storedThreadID = fs.readFileSync(pathFile + '.threadID', 'utf-8');

        if (isEnable === 'true' && (event.threadID === storedThreadID || event.senderID === api.getCurrentUserID())) {
            api.sendMessage(event.body, event.threadID);
            if (event.attachments[0]?.type === "sticker") {
                api.sendMessage({ sticker: event.attachments[0].stickerID }, event.threadID);
            }
        }
    },

    onStart: async function ({ api, event, args }) {
        try {
            if (args[0] === 'on') {
                fs.writeFileSync(pathFile, 'true');
                fs.writeFileSync(pathFile + '.threadID', event.threadID);
                api.sendMessage('Echo on successfully', event.threadID, event.messageID);
            } else if (args[0] === 'off') {
                fs.writeFileSync(pathFile, 'false');
                fs.unlinkSync(pathFile + '.threadID');
                api.sendMessage('Echo off successfully', event.threadID, event.messageID);
            } else {api.sendMessage('Invalid command. Please use "on" or "off"', event.threadID, event.messageID);
            }
        } catch (e) {
            console.error(e);
        }
    }
};