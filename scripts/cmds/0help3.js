const fs = require('fs');
const path = require('path');
const config = require('../../config.json'); // Adjust the path as needed

module.exports = {
  config: {
    name: "help3",
    version: "1.0",
    author: "Cruizex",
    countDown: 0,
    role: 0,
    category: "Utility",
    shortDescription: "Display help information for available commands",
    guide: {
      en: "{pn} help - Display help information for available commands",
    },
  },

  onStart: async function ({ api, args, message }) {
    const cmdFolderPath = path.join(__dirname);
    const files = fs.readdirSync(cmdFolderPath);

    // Display command guide or short description if a specific command is provided
    if (args[0] && isNaN(args[0])) {
      const commandName = args[0].toLowerCase() + '.js';
      const commandFile = files.find(file => file.toLowerCase() === commandName);

      if (commandFile) {
        const commandModule = require(path.join(cmdFolderPath, commandFile));

        // Check if the guide is available in English
        const englishGuide = commandModule.config.guide && commandModule.config.guide.en;

        if (englishGuide) {
          if (typeof englishGuide === 'string') {
            return message.reply(`Guide for ${commandFile}:\n${englishGuide.replace(/\{pn\}/g, config.prefix)}`);
          } else if (typeof englishGuide === 'object' && englishGuide.body) {
            return message.reply(`Guide for ${commandFile}:\n${englishGuide.body.replace(/\{pn\}/g, config.prefix)}`);
          }
        }

        return message.reply(`Guide for ${commandFile}:\nInformation not available.`);
      } else {
        return message.reply(`Command "${args[0]}" not found.`);
      }
    }

    // Handle page navigation
    const pageSize = 25; // Maximum number of commands per page
    const pageIndex = args[0] ? parseInt(args[0], 10) : 1;

    if (isNaN(pageIndex) || pageIndex < 1) {
      return message.reply('Invalid page number.');
    }

    const startIdx = (pageIndex - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const pageFiles = files
      .filter(file => file.endsWith('.js') && file !== 'help.js') // Exclude help.js from the list
      .slice(startIdx, endIdx);

    if (pageFiles.length === 0) {
      return message.reply('No commands to display on this page.');
    }

    const formattedCommands = pageFiles
      .map(file => `\u2022 ${path.parse(file).name}`)
      .join('\n');

    const totalPages = Math.ceil((files.length - 1) / pageSize); // Subtract 1 for help.js
    const currentPage = Math.min(Math.ceil(endIdx / pageSize), totalPages);

    let helpMessage = `Commands (Page ${currentPage}/${totalPages}):\n${formattedCommands}`;

    // Add instructions for navigating to the next page without {pn}
    if (endIdx < files.length) {
      helpMessage += `\n\nTo view the next page, use: help ${currentPage + 1}`;
    }

    message.reply(helpMessage);
  }
};