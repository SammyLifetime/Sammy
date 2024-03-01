const axios = require("axios");

module.exports = {
 config: {
 name: "github",
 aliases: ["git"],
 version: "1.0",
 author: "Samir",
 countDown: 5,
 role: 0,
 shortDescription: "Get github user info",
 longDescription: {
 en: "Provides you the information of github user"
 },
 category: "utility",
 guide: {
 en: "{pn} <username>"
 }
 },

 onStart: async function ({ api, event, args, message }) {
 try { 
 const userName = args.join(' ');
 const response = await axios.get(`https://www.nguyenmanh.name.vn/api/githubInfo?username=${userName}&apikey=FSShCQne`);

 const message = {body:`\n\──────── GITHUB STALK ────────\n\n❏Name: ${response.data.result.name}\n❏Username: ${response.data.result.login}\n❏Bio: ${response.data.result.bio}\n❏Followers: ${response.data.result.followers}\n❏Following: ${response.data.result.following}\n❏Total Public Repo: ${response.data.result.public_repos}\n❏Location: ${response.data.result.location}\n❏Creation Date: ${response.data.result.created_at}\n❏Profile Url: ${response.data.result.html_url}\n❏Profile Picture:`,attachment:await global.utils.getStreamFromURL(response.data.result.avatar_url)};
 return api.sendMessage(message, event.threadID);
 } catch (error) {
 console.error(error);
 message.reply("An error occurred while fetching the user information");
 }
 }
};