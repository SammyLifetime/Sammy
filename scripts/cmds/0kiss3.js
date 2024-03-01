const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const Jimp = require("jimp");
const { getStreamFromURL } = global.utils;

module.exports = {
	config: {
		name: "kiss3",
		version: "1.0",
		author: "SiAM",
		countDown: 2,
		role: 0,
		shortDescription: "couple kiss Edit with single Mention or double mention",
		longDescription: "Single Mention: create a kiss edit with sender id and mention id [in single mention sender user profile will set as girl in template].\nor\nDouble Mention [@tag1 @tag2] : create a kiss edit with two mentioned profile pictures [in double mention first mentioned id will set as boy and 2nd mentioned will be set as girl in edit template]",
		category: "Meme-Edit",
		guide: {
			en: "{pn} @tag |{pn} @tag1 @tag2"
		}
	},

	onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {    


    const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);
    const approvedmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_main.json`));
    const bypassmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
    const bypassmUid = event.senderID;
    if (bypassmain.includes(bypassmUid)) {
      console.log(`User ${bypassmUid} is in bypass list. Skipping the main approval check.`);
    } else {
      const threadmID = event.threadID;
      if (!approvedmain.includes(threadmID)) {
        const msgSend = message.reply(`cmd 'kissv2' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
        setTimeout(async () => {
          message.unsend((await msgSend).messageID);
        }, 40000);
        return;
      }
    }  
      
    let uid2 = null, uid1 = null;
    const input = args.join(' ');

    if (event.mentions && Object.keys(event.mentions).length === 2) {
        uid2 = Object.keys(event.mentions)[1];
        uid1 = Object.keys(event.mentions)[0];
    } else if (event.mentions && Object.keys(event.mentions).length === 1) {
        uid1 = event.senderID;
        uid2 = Object.keys(event.mentions)[0];
    } else {
        return message.reply('This Command will only work with Mention.\nPlease use👇\nSingle mention: for use your own id as a Girl in template and mention id will be Boy in template.\nDouble Mention: first @tag1 will be boy and @tag2 will be girl in template\n Thank You❤️');
    }




    
    //only Samuel Kâñèñgeè 
    if ((uid1 === '100089801347113' || uid2 === '100088353639740') && (uid1 !== '100074118110057' && uid2 !== '61550752558153')) {
  uid1 = '100093316011523';
  uid2 = '100093822263013';
  message.reply("sorry🥱💁\n\nOnly Samuel Kâñèñgeè allowed to kiss me 😌💗");
    }
    
		const profilePicUrl1 = `https://graph.facebook.com/${uid1}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
		const profilePicUrl2 = `https://graph.facebook.com/${uid2}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const userInfo1 = await api.getUserInfo(uid1);
const userInfo2 = await api.getUserInfo(uid2);
const userName1 = userInfo1[uid1].name;
const userName2 = userInfo2[uid2].name;

		const profilePicStream1 = await getStreamFromURL(profilePicUrl1);
		const profilePicStream2 = await getStreamFromURL(profilePicUrl2);

		const templateURL = "https://i.ibb.co/0XZzhCX/Picsart-23-04-14-17-40-01-306.jpg";

    const processingMessage = await message.reply("Image is Processing.\nPlease wait up to 45s");
		axios.all([axios.get(profilePicUrl1, { responseType: "arraybuffer" }), axios.get(profilePicUrl2, { responseType: "arraybuffer" }), axios.get(templateURL, { responseType: "arraybuffer" })])
		.then(axios.spread(async (profilePic1Response, profilePic2Response, templateResponse) => {
			const profilePic1 = await Jimp.read(profilePic1Response.data);
profilePic1.circle();
      profilePic1.rotate(11);
      
			const profilePic2 = await Jimp.read(profilePic2Response.data);
profilePic2.circle();
      profilePic2.rotate(-30);
			const template = await Jimp.read(templateResponse.data);

			profilePic1.resize(810, 810);
			profilePic2.resize(790, 790);

			template.composite(profilePic1, 650, 1300);
			template.composite(profilePic2, 1250, 1600); //[ - (increase to go right|decrease to go left)],[ + (increase go down, decrease to go up)]

			const outputBuffer = await template.getBufferAsync(Jimp.MIME_PNG);
			fs.writeFileSync(`${uid1}_${uid2}_kiss.jpg`, outputBuffer);

message.reply({
    body: `${userName1}\n🫦\n${userName2}\nEnjoy the kiss! 😘`,
    attachment: fs.createReadStream(`${uid1}_${uid2}_kiss.jpg`)
}, () => fs.unlinkSync(`${uid1}_${uid2}_kiss.jpg`));
      message.unsend((await processingMessage).messageID);
		})).catch((error) => {
			console.log(error);
			message.reply("There was an error processing the image.");
		});
	}
};
