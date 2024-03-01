const { exec } = require('child_process');

module.exports = {
  config: {
    name: "shell",
    version: "1.0",
    author: "King Monsterwith",
    countDown: 5,
    role: 2,
    shortDescription: "Execute shell commands",
    longDescription: "",
    category: "shell",
    guide: {
      vi: "{p}{n} <command>",
      en: "{p}{n} <command>"
    }
  },

  onStart: async function ({ args, message }) {
    const command = args.join(" ");

    if (!command) {
      return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nPlease provide a command to execute.\n\n╚════ஜ۩۞۩ஜ═══╝");
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\nAn error occurred while executing the command: ${error.message}\n\n╚════ஜ۩۞۩ஜ═══╝`);
      }

      if (stderr) {
        console.error(`Command execution resulted in an error: ${stderr}`);
        return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\nCommand execution resulted in an error: ${stderr}\n\n╚════ஜ۩۞۩ஜ═══╝`);
      }

      console.log(`Command executed successfully:\n${stdout}`);
      message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\nCommand executed successfully:\n${stdout}\n\n╚════ஜ۩۞۩ஜ═══╝`);
    });
  }
};