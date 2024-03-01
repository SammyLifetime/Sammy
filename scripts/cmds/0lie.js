module.exports = {
  config: {
    name: "liedetector",
    version: "1.0",
    author: "LiANE",
    aliases: ["detect","lie"],
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Kiểm tra sự thật",
      en: "Check the truthfulness"
    },
    longDescription: {
      vi: "Kiểm tra sự thật của một phát biểu",
      en: "Check the truthfulness of a statement"
    },
    category: "ai",
    guide: {
      vi: "{pn} <phát biểu>",
      en: "{pn} <statement>"
    }
  },

  onStart: async function ({ message, args }) {
    // Check if a statement is provided
    if (args.length === 0) {
      return message.reply("Please enter a statement to check.");
    }

    // Generate a random lie percentage (between 0% and 100%)
    const liePercentage = Math.floor(Math.random() * 101);

    // Determine the result based on the lie percentage
    let result = "";
    if (liePercentage < 20) {
      result = "The statement is highly likely to be true.";
    } else if (liePercentage < 60) {
      result = "There's a moderate chance that the statement is true.";
    } else {
      result = "The statement is likely to be false.";
    }

    // Generate an authentic-looking detailed response
    const response = `🔍 Lie Detector Report by LiANE:
    Statement: "${args.join(" ")}"
    Lie Percentage: ${liePercentage}%
    
    Analysis: ${result}`;

    // Send the lie detector report
    message.reply(response);
  },
};