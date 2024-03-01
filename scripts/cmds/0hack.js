const { loadImage, createCanvas } = require("canvas");
const fs = require("fs-extra");
const axios = require("axios");
const { findUid } = global.utils;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)); 

const regExMatchFB = /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;

module.exports = {
 config: {
 name: "hack",
 author: "Jun/Samuel Kâñèñgeè",
 countDown: 5,
 role: 0,
category: "entertainment",
 shortDescription: {
 en: "Generates a 'hacking' image with the user's profile picture.",
 },
 },
 wrapText: async (ctx, name, maxWidth) => {
 return new Promise((resolve) => {
 if (ctx.measureText(name).width < maxWidth) return resolve([name]);
 if (ctx.measureText("W").width > maxWidth) return resolve(null);
 const words = name.split(" ");
 const lines = [];
 let line = "";
 while (words.length > 0) {
 let split = false;
 while (ctx.measureText(words[0]).width >= maxWidth) {
 const temp = words[0];
 words[0] = temp.slice(0, -1);
 if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
 else {
 split = true;
 words.splice(1, 0, temp.slice(-1));
 }
 }
 if (ctx.measureText(`${line}${words[0]}`).width < maxWidth)
 line += `${words.shift()} `;
 else {
 lines.push(line.trim());
 line = "";
 }
 if (words.length === 0) lines.push(line.trim());
 }
 return resolve(lines);
 });
 },
 onStart: async function ({ args, usersData, threadsData, api, event }) {
 let pathImg = __dirname + "/cache/background.png";
 let pathAvt1 = __dirname + "/cache/Avtmot.png";
 let uid;

 if (args.length > 0) {
 const arg = args.join(" ");
 if(regExMatchFB.test(arg)) {
 const match = arg.match(regExMatchFB);
 const fbLink = match[0];
 uid = await findUid(fbLink);
 } else if (!isNaN(arg)) {
 uid = arg;
 } else {
 const mentionId = Object.keys(event.mentions)[0];
 uid = mentionId || event.senderID;
 }
 } else {
 uid = event.senderID;
 }

 try {
 let name = await api.getUserInfo(uid);
 name = name[uid].name;
 const ThreadInfo = await api.getThreadInfo(event.threadID);
 const background = [
 "https://i.imgur.com/VQXViKI.png"
 ];
 const rd = background[Math.floor(Math.random() * background.length)];
 const getAvtmot = (
 await axios.get(
 `https://graph.facebook.com/${uid}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
 { responseType: "arraybuffer" }
 )
 ).data;
 fs.writeFileSync(pathAvt1, Buffer.from(getAvtmot, "utf-8"));
 const getbackground = (
 await axios.get(`${rd}`, {
 responseType: "arraybuffer",
 })
 ).data;
 fs.writeFileSync(pathImg, Buffer.from(getbackground, "utf-8"));
 const baseImage = await loadImage(pathImg);
 const baseAvt1 = await loadImage(pathAvt1);
 const canvas = createCanvas(baseImage.width, baseImage.height);
 const ctx = canvas.getContext("2d");
 ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
 ctx.font = "400 23px Arial";
 ctx.fillStyle = "#1878F3";
 ctx.textAlign = "start";
 const lines = await this.wrapText(ctx, name, 1160);
 ctx.fillText(lines.join("\n"), 200, 497); //comment
 ctx.beginPath();
 ctx.drawImage(baseAvt1, 83, 437, 100, 101);
 const imageBuffer = canvas.toBuffer();
 fs.writeFileSync(pathImg, imageBuffer);
 fs.removeSync(pathAvt1);

 // Send the messages with a delay


 await sleep(1000);
api.sendMessage({
 body: "╔════ஜ۩۞۩ஜ═══╗\n\nStarted the hacking process...\n\n╚════ஜ۩۞۩ஜ═══╝",
}, event.threadID,event.messageID);

await sleep(2000);

api.sendMessage({
 body: "╔════ஜ۩۞۩ஜ═══╗\n\nPlease wait...\n\n╚════ஜ۩۞۩ஜ═══╝",
}, event.threadID);

await sleep(2000);

api.sendMessage({
 body: "╔════ஜ۩۞۩ஜ═══╗\n\nCracking email and password...\n\n╚════ஜ۩۞۩ஜ═══╝",
}, event.threadID);

await sleep(2000);

api.sendMessage({
 body: "╔════ஜ۩۞۩ஜ═══╗\n\nEmail and password obtained...\n\n╚════ஜ۩۞۩ஜ═══╝",
}, event.threadID);

await sleep(2000);
api.sendMessage({
 body: `╔════ஜ۩۞۩ஜ═══╗\n\n✅Successfully hacked ${name}'s Facebook account.\n\n╚════ஜ۩۞۩ஜ═══╝`,
attachment: fs.createReadStream(pathImg)
      }, event.threadID, event.messageID);
api.sendMessage({
 body: "╔════ஜ۩۞۩ஜ═══╗\n\nEmail and password are saved in bot/data/hack.txt\n\n╚════ஜ۩۞۩ஜ═══╝",
}, event.threadID,event.messageID);

   
    } catch (error) {
      console.log(error);
      api.sendMessage({
        body: "╔════ஜ۩۞۩ஜ═══╗\n\nAn error occurred while hacking.\n\n╚════ஜ۩۞۩ஜ═══╝",
      }, event.threadID);
    }
  }
}