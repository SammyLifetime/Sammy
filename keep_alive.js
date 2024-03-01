const axios = require("axios");
const shell = require("child_process");

setInterval(() => {
  axios.get('https://ed1849c1-2751-46f4-86b3-0c117068f407-00-3k677qmf0yyew.picard.replit.dev/')
    .catch(() => {
      shell.exec('node index.js');
    });
}, 1000); // Check every second
