const { createReadStream, unlinkSync, createWriteStream } = require("fs-extra");
const { resolve } = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "say",
    aliases: ["tts"],
    version: "1.1",
    author: "JVB",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "text to speech with language",
    },
    longDescription: {
      en: "text to speech language",
    },
    category: "box chat",
    guide: {
      en: "/say [language] [text]: Convert text to speech. Default language is English.\mple usages:\y hi\y ja こんにちは"
    },
  },

  onStart: async function ({ api, event, args, getLang }) {
    try {
      const content = event.type === "message_reply" ? event.messageReply.body : args.join(" ");

      // Check if the user has specified a language
      const languageToSay = args[0];
      if (!languageToSay || !supportedLanguages.includes(languageToSay)) {
        languageToSay = defaultLanguage;
      }

      // Check if the specified language is supported
      if (!supportedLanguages.includes(languageToSay)) {
        throw new Error(`Unsupported language: ${languageToSay}`);
      }

      // Download the audio file from Google Translate
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(content)}&tl=${languageToSay}&client=tw-ob`;
      const response = await axios({
        method: "GET",
        url,
        responseType: "stream",
      });

      // Create a promise to download the audio file
      const promise = new Promise((resolve, reject) => {
        const writer = response.data.pipe(createWriteStream(path));
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      // Wait for the audio file to be downloaded
      await promise;

      // Send the audio file to the user's chat thread
      api.sendMessage({ attachment: createReadStream(path) }, event.threadID);

      unlinkSync(path); // Delete the audio file after it has been sent
    } catch (error) {
      console.error("Error occurred during TTS:", error);
      // Handle error response here, e.g., send an error message to the user
    }
  },
};