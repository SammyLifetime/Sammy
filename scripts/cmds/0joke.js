const axios = require('axios');

module.exports = {
    config: {
        name: "joke",
        version: "1.2",
        author: "Shikaki",
        countDown: 10,
        role: 0,
        shortDescription: {
            en: "Get a random joke."
        },
        longDescription: {
            en: "Get a random joke from JokeAPI. You can specify a category like 'programming', 'misc', 'dark', 'pun', 'spooky', or 'christmas'. You can also search for jokes containing a specific word."
        },
        category: "😄 Fun",
        guide: {
            en: "{pn}\n{pn} any\n{pn} programming\n{pn} misc\n{pn} dark\n{pn} pun\n{pn} spooky\n{pn} christmas\n{pn} includes <word>"
        },
        jokeCmd: "😄Jokes😄\n\nHere are all the available categories:\n\n{pn}joke any\n{pn}joke programming\n{pn}joke misc\n{pn}joke dark\n{pn}joke pun\n{pn}joke spooky\n{pn}joke christmas\n{pn}joke includes <word>",
        jokeIncludes: "⚠️ Please provide a search word after {pn}joke includes\n\nE.g.\n\n{pn}joke includes clown"
    },

    onStart: async function ({ message, args, prefix }) {
        try {
            const validCategories = ['any', 'programming', 'misc', 'dark', 'pun', 'spooky', 'christmas'];
            const jokeCategoryOrWord = args[0]?.toLowerCase();

            if (!jokeCategoryOrWord || (!validCategories.includes(jokeCategoryOrWord) && jokeCategoryOrWord !== 'includes')) {
                return message.reply(module.exports.config.jokeCmd.replace(/{pn}/g, prefix));
            }

            if (jokeCategoryOrWord === 'includes') {
                const searchWordIndex = args.indexOf('includes');
                const searchWord = searchWordIndex !== -1 ? args.slice(searchWordIndex + 1).join(' ') : null;

                if (!searchWord) {
                    return message.reply(module.exports.config.jokeIncludes.replace(/{pn}/g, prefix));
                }

                const jokeResponse = await axios.get(`https://v2.jokeapi.dev/joke/Any`, {
                    params: {
                        contains: searchWord
                    }
                });

                const jokeData = jokeResponse.data;

                if (jokeData) {
                    if (jokeData.error || !jokeData.joke) {
                        return message.reply(`😐 No joke found with the word "${searchWord}".`);
                    }

                    let replyMessage = `😄 Here's a random joke containing the word "${searchWord}":\n`;

                    if (jokeData.setup && jokeData.delivery) {
                        replyMessage += `\n${jokeData.setup}\n${jokeData.delivery}`;
                    } else if (jokeData.joke) {
                        replyMessage += jokeData.joke;
                    }

                    if (jokeData.flags) {
                        const flags = Object.keys(jokeData.flags).filter(flag => jokeData.flags[flag]);
                        if (flags.length > 0) {
                            replyMessage += `\n⚠️ This joke is ${flags.join(', ')}.\n`;
                        }
                    }

                    message.reply(replyMessage);
                } else {
                    message.reply("😐 Unable to fetch a joke at the moment.");
                }
            } else {
                const jokeResponse = await axios.get(`https://v2.jokeapi.dev/joke/${jokeCategoryOrWord}`);
                const jokeData = jokeResponse.data;

                if (jokeData) {
                    let replyMessage = `😄 Here's a random ${jokeCategoryOrWord === 'any' ? 'joke' : `${jokeCategoryOrWord} joke`} for you:\n`;

                    if (jokeData.flags) {
                        const flags = Object.keys(jokeData.flags).filter(flag => jokeData.flags[flag]);
                        if (flags.length > 0) {
                            replyMessage += `\n⚠️ This joke is ${flags.join(', ')}.\n`;
                        }
                    }

                    if (jokeData.setup && jokeData.delivery) {
                        replyMessage += `\n${jokeData.setup}\n${jokeData.delivery}`;
                    } else if (jokeData.joke) {
                        replyMessage += jokeData.joke;
                    }

                    message.reply(replyMessage);
                } else {
                    message.reply("😐 Unable to fetch a joke at the moment.");
                }
            }
        } catch (error) {
            message.reply("❌ An error occurred while fetching the joke. Please try again later.");
        }
    }
};
