const axios = require("axios");

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
        if (!args || !Array.isArray(args) || args.length === 0) {
            return api.sendMessage("Please provide a Mirai code to translate.", event.threadID);
        }

        const code1 = args.join('\n'); // Assuming Code 1 is provided as multiline text

        const replacements = [
            { from: /config: {/, to: "config: {" },
            { from: /aliases: \[(.*?)\],/, to: "aliases: [$1]," },
            { from: /version: "(.*?)",/, to: "version: \"$1\"," },
            { from: /author: "(.*?)",/, to: "credits: \"$1\"," },
            { from: /role: (\d+),/, to: "hasPermssion: $1," },
            { from: /shortDescription: {(\s+en: "(.*?)")/g, to: "shortDescription: {\n      en: \"$2\"" },
            { from: /longDescription: {(\s+en: "(.*?)")/g, to: "longDescription: {\n      en: \"$2\"" },
            { from: /category: "(.*?)",/, to: "commandCategory: \"$1\"," },
            { from: /guide: {(\s+en: "(.*?)")/g, to: "guide: {\n      en: \"$2\"" },
            { from: /config: {(\s+name: "(.*?)")/g, to: "config: {\n      name: \"$2\"" },
        ];

        let code2 = code1;
        replacements.forEach(replacement => {
            code2 = code2.replace(replacement.from, replacement.to);
        });

        return api.sendMessage(`Translated Mirai Code to Goatbot Code:\n${code2}`, event.threadID);
    }
};