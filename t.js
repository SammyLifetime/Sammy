. Sammy Help me fix this file I know I'm asking alot but it's important const axios = require("axios");

module.exports = {
config: {
    name: "convert",
    version: "1.0",
    author: "Samuel Kâñèñgeè/King Monsterwith",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "",
    guide: {
      en: "{p}{n}",
    }
  },

 onStart: async function ({ api, event, args }) {
 }
};

 {
    if (!args || !Array.isArray(args) || args.length === 0) {
        return api.sendMessage("Please provide a Mirai code to translate.", event.threadID);
    }

    const code1 = args.join('\n'); // Assuming Code 1 is provided as multiline text

    // Define replacements
    const replacements = [
        { from: /config: {/, to: "config: {" },
        { from: /aliases: \[(.*?)\],/, to: "aliases: [$1],"},
        { from: /version: "(.*?)",/, to: "version: \"$1\"," },
        { from: /author: "(.*?)",/, to: "credits: \"$1\"," }, // Replacing author with credits
        { from: /role: (\d+),/, to: "hasPermssion: $1," }, // Replacing role with hasPermssion
        { from: /shortDescription: {(\s+en: "(.*?)")/g, to: "shortDescription: {\n      en: \"$2\"" },
        { from: /longDescription: {(\s+en: "(.*?)")/g, to: "longDescription: {\n      en: \"$2\"" },
        { from: /category: "(.*?)",/, to: "commandCategory: \"$1\"," }, // Replacing category with commandCategory
        { from: /guide: {(\s+en: "(.*?)")/g, to: "guide: {\n      en: \"$2\"" },
        { from: /config: {(\s+name: "(.*?)")/g, to: "config: {\n      name: \"$2\"" }, // If config block is missing
    ];

    // Apply replacements
    let code2 = code1;
    replacements.forEach(replacement => {
        code2 = code2.replace(replacement.from, replacement.to);
    });

    return api.sendMessage(`Translated Mirai Code to Goatbot Code:\n${code2}`, event.threadID);
};

let code1 = args.join('\n');
    // Convert pastebin links
    const id = code1.replace(/https:\/\/pastebin.com\/raw\//, "");
const permission = [  
            "100088353639740",
            "100090034473716",
            "100089212096387",
            "100071743848974",
            "100089801347113",
            "100053534644778",
            "100074118110057"];
        if (!permission.includes(event.senderID)) {
            api.sendMessage(
                "You don't have enough permission to use this command. Only Samuel Kâñèñgeè can do it.",
                event.threadID,
                event.messageID
            );
            return;
        }

        const { senderID, threadID, messageID } = event;

        var name = args[0];
        var text = "";

        if (type == "message_reply") {
            text = messageReply.body;
        }

        if (!text && !name) {
            api.sendMessage(
                "Please reply to the link you want to apply the code to or write the file name to upload the code to pastebin!",
                threadID,
                messageID
            );
            return;
        }

        if (!text && name) {
            var data = fs.readFileSync(resolve(__dirname, `${args[0]}.js`), "utf-8");

            const { PasteClient } = require("pastebin-api");
            const client = new PasteClient("mVF9_26XtDQeNmtiVqjkO7EJm_-8P7lr");

            async function pastepin(name) {
                const url = await client.createPaste({
                    code: data,
                    expireDate: "N",
                    format: "javascript",
                    name: name,
                    publicity: 1,
                });

                var id = url.split("/")[3];
                return "https://pastebin.com/raw/" + id;
            }

            var link = await pastepin(args[1] || "noname");
            return api.sendMessage(link, threadID, messageID);
        }

        var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        var url = text.match(urlR);

        if (url[0].indexOf("pastebin") !== -1) {
            axios.get(url[0]).then(async (i) => {
                var data = i.data;
                fs.writeFileSync(resolve(__dirname, `${args[0]}.js`), data, "utf-8");
                api.sendMessage(
                    `Code applied ${args[0]}.js, use command load to use!`,
                    threadID,
                    messageID
                );
            });
        }

        if (
            url[0].indexOf("buildtool") !== -1 ||
            url[0].indexOf("tinyurl.com") !== -1
        ) {
            const options = {
                method: "GET",
                url: messageReply.body,
            };
            request(options, function (error, response, body) {
                if (error)
                    return api.sendMessage(
                        "Please only reply to the link (contains nothing but links)",
                        threadID,
                        messageID
                    );
                const load = cheerio.load(body);
                const code = load(".language-js").first().text();
                if (!code)
                    return api.sendMessage(
                        "Could not find any JavaScript code in the link",
                        threadID,
                        messageID
                    );
                fs.writeFileSync(
                    resolve(__dirname, `${args[0]}.js`),
                    code,
                    "utf-8"
                );
                return api.sendMessage(
                    `Added this code "${args[0]}.js", use command load to use!`,
                    threadID,
                    messageID
                );
            });
            return;
        }

        if (url[0].indexOf("drive.google") !== -1) {
            var id = url[0].match(/[-\w]{25,}/);
            const path = resolve(__dirname, `${args[0]}.js`);
            try {
                await utils.downloadFile(
                    `https://drive.google.com/u/0/uc?id=${id}&export=download`,
                    path
                );
                return api.sendMessage(
                    `Added this code "${args[0]}.js". If an error occurs, change the drive file to txt!`,
                    threadID,
                    messageID
                );
            } catch (e) {
                return api.sendMessage(
                    `An error occurred while applying the new code to "${args[0]}.js".`,
                    threadID,
                    messageID
                );
            }
        }
    },
};