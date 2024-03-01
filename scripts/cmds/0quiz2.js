const moment = require ('moment-timezone');
const fs = require('fs');
const axios = require('axios');
module.exports = {
  config: {
    name: "quiz",
    aliases: ["qz"],
    version: "1.8",
    author: "Jun",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money"
    },
    longDescription: {
      vi: "",
      en: "game"
    },
    category: "game",
    guide: {
      en: "{pn}"
    },
    envConfig: {
      reward: 30000
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "Congrats, you got the right answer and won %1$",
      wrong: "Oops, wrong answer."
    }
  },

  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
  const { getPrefix } = global.utils;
  const p = getPrefix(event.threadID);
  if (args.length === 0) {
    message.reply(`Please add a category\nHere's the list of categories:\n==============\nhistoryph\ncs\nenglish\nmath\nphysics\nchemistry\nhistory\nphilosophy\nrandom\nscience\n==============\nExample usage: ${p}quiz english\n\n${p}quiz rank >> view your quiz rank\n${p}quiz leaderboard >> view the top players`);
    return;
  }     
  if (args[0].toLowerCase() === "rank") {
  try {
    const response = await axios.get('https://api-test.yourboss12.repl.co/api/quiz/quiz/all');
    const playerData = response.data;
    playerData.sort((a, b) => b.correct - a.correct);
    let rank = null;
    for (let i = 0; i < playerData.length; i++) {
      if (playerData[i].playerid === event.senderID) {
        rank = i + 1;
        break;
      }
    }
    if (rank) {
      const player = playerData[rank - 1];
      const userData = await usersData.get(player.playerid);
      const name = userData.name;
      let rankMessage = `🏆Rank: ${rank}\n\n`;
      rankMessage += `Name: ${name}\n`;
      rankMessage += `Correct Answers: ${player.correct}\n`;
      rankMessage += `Wrong Answers: ${player.wrong}\n`;
      rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
      message.reply(rankMessage);
    } else {
      message.reply("You are not ranked yet.");
    }
    return;
  } catch (error) {
    console.log(error);
    message.reply('Failed to fetch rank data.');
    return;
  }
  }        


if (args[0].toLowerCase() === "leaderboard") {
  try {
    const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
    const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

    const response = await axios.get('https://api-test.yourboss12.repl.co/api/quiz/quiz/all');
    const playerData = response.data;
    playerData.sort((a, b) => b.correct - a.correct);
    let leaderboardMessage = '│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: ';
    leaderboardMessage += `${currentDate}\n`;
    leaderboardMessage += `│Current Time: ${currentTime}\n`;

    const quizStartDate = new Date("7/15/2023");
    const quizEndDate = new Date(currentDate);
    const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
    leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
    leaderboardMessage += '=========================\n';
    let page = 1;
    let pageSize = 5;
    if (args[1] && !isNaN(args[1])) {
      page = parseInt(args[1]);
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    for (let i = startIndex; i < endIndex && i < playerData.length; i++) {
      const player = playerData[i];
      const userData = await usersData.get(player.playerid);
      const name = userData.name;
      leaderboardMessage += `│Rank #${i + 1}\n│「${name}」\n`;
      leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
      leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
      leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
      leaderboardMessage += '╰──────────────────\n';
    }

    leaderboardMessage += `Total Players: ${playerData.length}`;
    message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
    return;
  } catch (error) {
    console.error(error);
    message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
    return;
  }
}   
  const category = args[0] ? args[0].toLowerCase() : '';
  if (!['english','historyph', 'math', 'physics', 'chemistry', 'cs', 'history', 'philosophy','biology','random', 'science'].includes(category)) {
    message.reply(`Invalid category.\nHere are the available categories:\n===============\nenglish\nmath\ncs\nphysics\nchemistry\nhistoryph\nhistory\nphilosophy\nrandom\nscience\n==============\nExample usage: ${p}quiz english\n\n${p}quiz rank >> view your quiz rank\n${p}quiz leaderboard >> view the top players\n`);
    return;
  }

  try {
    const response = await axios.get(`https://api-test.yourboss12.repl.co/api/quiz?category=${category}`);
    const Qdata = response.data;
    if (!Qdata.question) {
      return;
    }
    const text = Qdata.question.split('\n')[0];
    const choices = Qdata.question.split('\n').slice(1).join('\n');
    const body = Qdata.answer;
    message.reply({ body: `${getLang('reply')}\n\n${text}\n\n${choices}` }, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        messageID: info.messageID,
        author: event.senderID,
        answer: Qdata.answer,
        answered: false,
        category,
      });
      setTimeout(() => {
        const Reply = global.GoatBot.onReply.get(info.messageID);
        if (!Reply.answered) {
          message.unsend(info.messageID);
          global.GoatBot.onReply.delete(info.messageID);
        }
      }, 100000);
    });
  } catch (error) {
    message.reply(`Sorry, there was an error getting questions for the ${category} category. Please try again later.`);
    console.log(error);
  }
},
                          

  onReply: async function ({ message, Reply, event, getLang, usersData, envCommands, commandName }) {
    const { author, messageID, answer, answered, category } = Reply;
    if (answered || author != event.senderID) {
      message.reply("⚠️You are not the player of this question!");
      return;
    }

    if (formatText(event.body) == formatText(answer)) {
     global.GoatBot.onReply.delete(messageID);     message.unsend(event.messageReply.messageID);
      await usersData.addMoney(event.senderID, envCommands[commandName].reward);
      const playerid = event.senderID;
      const correctorwrong = 'correct';
      const apiUrl = `https://api-test.yourboss12.repl.co/api/quiz/quiz?playerid=${playerid}&correctorwrong=${correctorwrong}`;
      axios.get(apiUrl)
        .then(response => {
          console.log(response.data);
        })
        .catch(error =>{
          console.log(error);
        });      message.reply(getLang('correct', envCommands[commandName].reward));
    } else {
     global.GoatBot.onReply.delete(messageID);    message.unsend(event.messageReply.messageID);
      const playerid = event.senderID;
      const correctorwrong = 'wrong';
      const apiUrl = `https://api-test.yourboss12.repl.co/api/quiz/quiz?playerid=${playerid}&correctorwrong=${correctorwrong}`;
      axios.get(apiUrl)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });

      message.reply(getLang('wrong'));
    }
  }
};
function formatText(text) {
  return text.normalize("NFD").toLowerCase();
          }