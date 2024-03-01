const fs = require('fs');

module.exports = {
  config: {
    name: 'aidatabase',
    aliases: ["aid"],
    version: '2.0',
    author: 'SiAM',
    category: "AI-edit",
    cooldown: 5,
    role: 2,
  },

  onStart: async function ({ api, at, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName,args, getLang }) {
    const qnaFile = './scripts/cmds/assist_json/qna.json';

    // Get the question and answers from the command arguments
    const input = args.join(" ");
    const qnaPairs = input.split(';').map(pair => pair.trim()).filter(Boolean);
    const qnaData = {};

    for (const pair of qnaPairs) {
      const match = pair.match(/^([^\:]+)\:\s*(.+)$/);
      if (!match) {
        message.reply(`Invalid input. Please use the format /qnaadd question : ans1- ans2- ans3; question2: ans1- ans2- ans3`);
        return;
      }

      const question = match[1].trim();
      const answers = match[2].split('-').map(ans => ans.trim());

      qnaData[question] = qnaData[question] || [];
      qnaData[question].push(...answers);
    }

    // Read the existing qna data from file
    const qna = fs.existsSync(qnaFile) ? JSON.parse(fs.readFileSync(qnaFile)) : {};

    // Add the new questions and answers to the qna data
    for (const question in qnaData) {
      if (qna[question]) {
        // If the question already exists, add the new answers to the existing ones
        qna[question] = qna[question].concat(qnaData[question]);
      } else {
        // If the question is new, create a new entry for it
        qna[question] = qnaData[question];
      }
    }

    // Write the updated qna data back to file
    fs.writeFileSync(qnaFile, JSON.stringify(qna, null, 2));

    message.reply(`Added ${Object.keys(qnaData).length} questions to the database.`);
  },
};