const fs = require("fs");
const path = require("path");

const aliasFilePath = "aliases.json";

function saveAliases(aliases) {
  try {
    const data = JSON.stringify(aliases);
    fs.writeFileSync(aliasFilePath, data);
    console.log("Aliases data saved successfully");
  } catch (err) {
    console.error("Error saving aliases data:", err);
    console.log(`❌ | Error saving aliases data: ${err}`);
  }
}

function loadAliases() {
  try {
    const data = fs.readFileSync(aliasFilePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading aliases data:", err);
    console.log(`❌ | Error loading aliases data: ${err}`);
    return {};
  }
}

module.exports = {
  config: {
    name: "noprefix",
    version: "1.0",
    author: "LiANE/King Monsterwith",
    role: 2,
    category: "Config",
    shortDescription: {
      en: "Sets a no prefix alias to an existing command without modifying existing files",
    },
    longDescription: {
      en: "Sets a no prefix alias to an existing command without modifying existing files",
    },
    guide: {
      en: "noprefix add <alias> <command> - Add an alias for a command",
    },
  },

  onStart: async function ({ api, args, event, message }) {
    const subcommand = args[0];

    if (subcommand === "add") {
      const alias = args[1];
      const command = args[2];

      if (alias && command) {
        const aliases = loadAliases();

        if (!aliases[alias]) {
          
          aliases[alias] = command;
          saveAliases(aliases);

          message.reply(`Alias '${alias}' added for command '${command}'`);
        } else {
          message.reply(`Alias '${alias}' already exists for command '${aliases[alias]}'`);
        }
      } else {
        message.reply("Usage: noprefix add <alias> <command>");
      }
    } else if (subcommand === "del") {
      const alias = args[1];

      if (alias) {
        const aliases = loadAliases();

        if (aliases[alias]) {
          // Remove the alias
          delete aliases[alias];
          saveAliases(aliases);

          message.reply(`Alias '${alias}' has been removed`);
        } else {
          message.reply(`Alias '${alias}' does not exist`);
        }
      } else {
        message.reply("Usage: noprefix del <alias>");
      }
    } else {
      message.reply("Usage: noprefix add <alias> <command> OR noprefix del <alias>");
    }
  },

  onChat: async function ({ api, args, event, message, role, getLang, usersData, threadsData, dashBoardData }) {
    const chat = args[0];
    const commandFile = `${chat}.js`;

    const aliases = loadAliases();
    if (!aliases[chat]) {
      return;
    }

    try {
      const myCommand = require(path.join(__dirname, commandFile));

      if (myCommand.onStart && typeof myCommand.onStart === "function") {
        await myCommand.onStart({ api, args, event, message, role, getLang, usersData, threadsData, dashBoardData });
      }

      if (myCommand.onChat && typeof myCommand.onChat === "function") {
        await myCommand.onChat ({ api, args, event, message, role, getLang, usersData, threadsData, dashBoardData });
      }
    } catch (error) {
      console.error("Error executing associated command:", error);
      message.reply(`❌ | Error executing no prefix command!
${error}`);
    }
  },
};