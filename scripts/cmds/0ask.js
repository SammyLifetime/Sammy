const fs = require('fs-extra');
const axios = require("axios");
const stringSimilarity = require('string-similarity');

module.exports = {
  config: {
    name: 'ask',
    aliases: ["sam"],
    version: '2.6',
    author: 'Samuel',
    category: "AI",
    cooldown: 0,
    role: 0,
    shortDescription: "Talk with AI",
    longDescription: "artificial intelligence will reply your all question with voice 🔗👌..!",
    guide: {
			en: "{pn} your_question"
    }
      			
 },

  langs: {
    en: {
      noAnswerFound: "Sorry, I don't know the answer to that question [AIP not responding]",
    },
  },

onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
    const qaFile = './scripts/cmds/assist_json/qna.json';
    const qna = JSON.parse(fs.readFileSync(qaFile));

    const newQaFile = './scripts/cmds/assist_json/new_qna.json';
    let newQna = {};
    if (fs.existsSync(newQaFile)) {
      newQna = JSON.parse(fs.readFileSync(newQaFile));
    }
  const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);
    const userQuestion = args.join(' ');
  if (!userQuestion) {
      message.reply(`Please provide some text then i will answer your text 💁\n\n example: ${p} ask 'your text'`);
      return;
  }
    let botAnswer = null;
    let matchedQuestion = null; 
    let maxSimilarity = -1; 
    for (const [question, answers] of Object.entries(qna)) {
      const similarity = stringSimilarity.compareTwoStrings(userQuestion.toLowerCase(), question.toLowerCase()); 
      if (similarity > maxSimilarity && similarity >= 0.7) { 
        maxSimilarity = similarity;
        matchedQuestion = question;
        botAnswer = answers[Math.floor(Math.random() * answers.length)]; 
      }
    }

    if (!botAnswer) {
      for (const [question, answers] of Object.entries(newQna)) {
        const similarity = stringSimilarity.compareTwoStrings(userQuestion.toLowerCase(), question.toLowerCase());
        if (similarity > maxSimilarity && similarity >= 0.8) {
          maxSimilarity = similarity;
          matchedQuestion = question;
          botAnswer = answers[Math.floor(Math.random() * answers.length)];
        }
      }
    }

  if (!botAnswer) {
      const openaiApiKey = "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";
      const openaiApiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

      try {
        const response = await axios.post(
          openaiApiUrl,
          {
            prompt: `Q: ${userQuestion}\nA:`,
            max_tokens: 400,
            n: 1,
            stop: '\n',
          },
          {
            headers: {
              Authorization: `Bearer ${openaiApiKey}`,
              'Content-Type': 'application/json',
             },
        });

        botAnswer = response.data.choices[0].text.trim();

      } catch (err) {
        console.error(err);
      }
    }
    
  const lang = 'en';
		const path = "./Ai.mp3";
		const urlPrefix = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=`;

		try {
			if (botAnswer.length <= 150) {
				const response = await axios({
					method: "get",
					url: `${urlPrefix}${encodeURIComponent(botAnswer)}`,
					responseType: "stream"
				});

				const writer = fs.createWriteStream(path);
				response.data.pipe(writer);
				writer.on("finish", () => {
					message.reply({
            body:`${botAnswer}`,
						attachment: fs.createReadStream(path)
					}, () => {
						fs.remove(path);
					});
				});
			} else {
				const chunks = botAnswer.match(/.{1,150}/g);

				for (let i = 0; i < chunks.length; i++) {
					const response = await axios({
						method: "get",
						url: `${urlPrefix}${encodeURIComponent(chunks[i])}`,
						responseType: "stream"
					});
					const writer = fs.createWriteStream(path, { flags: i === 0 ? 'w' : 'a' });
					response.data.pipe(writer);

					if (i === chunks.length - 1) {
						writer.on("finish", () => {
							message.reply({
                body:`${botAnswer}`,
								attachment:
          fs.createReadStream(path)
							}, () => {
								fs.remove(path);
							});
						});
					}
				}
			}
		} catch (err) {
			console.error(err);
			message.reply(`S-sorry dear 🥺, Something wants wrong, [API is not Responding] please try again later..!`);
                            }

      
      if (matchedQuestion !== userQuestion && !newQna[userQuestion]) {
        newQna[userQuestion] = qna[matchedQuestion]; 
        fs.writeFileSync(newQaFile, JSON.stringify(newQna, null, 2)); 
      }
    }
  
};