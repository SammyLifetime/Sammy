const axios = require('axios');
const fs = require('fs-extra');
const request = require('request');
const videoLinks = JSON.parse(fs.readFileSync('./scripts/cmds/assist_json/videolinks.json'));

module.exports = {
    config: {
        name: "redvideo",
        version: "3.1",
        author: "SiAM |@Siam.The.Fox",
        countDown: 20,
        role: 0,
        category: "NSFW",
      shortDescription: "porn video based on category",
      longDescription: "bot will send you porn video based on category",
      guide: {
        en: "{pn} <category>| type only {pn} to see category list"
      }
      
    },

    onStart: async function ({ api, args, message, event }) {


const isDisabled = true;
    if (isDisabled) {
      const replyMessage = 'Sorry, Redvideo Command is Temporary Deactivated by Admin \n\n Reason: Account Message block problem.\n join support group for more \nType: /support\nto join';
      message.reply(replyMessage);
      return;
    }
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
        const msgSend = message.reply(`cmd 'hentaivid' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
        setTimeout(async () => {
          message.unsend((await msgSend).messageID);
        }, 40000);
        return;
      }
    }  
      

      const approvedIds = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_ids.json`));
    const bypassIds = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
    const bypassUid = event.senderID;
    if (bypassIds.includes(bypassUid)) {
      console.log(`User ${bypassUid} is in bypass list. Skipping the NSFW approval check.`);
    } else {
      const threadID = event.threadID;
      if (!approvedIds.includes(threadID)) {
        const msgSend = message.reply("Need permission for use this Command..\n\nYour thread/group is not allowed to use this command (18+ NSFW video)\ntype  /requestNSFW\nto send a request to admin for permission...");
        setTimeout(async () => {
          message.unsend((await msgSend).messageID);
        }, 50000);
        return;
      }
    }    

        
      const validCategories = Object.keys(videoLinks);

let videoUrl;
let videoId;
let category;

if (args.length > 0) {
    category = args[0];
} else {
    message.reply("Invalid category.\nPlease choose from:  " + validCategories.join(', '));
    return;
}

if (category.toLowerCase() === 'scandal') {
    try {
        const response = await axios.get('https://milanbhandari.imageapi.repl.co/kanda?apikey=nepaihoni');

        if (response.status === 200 && response.data && response.data.url) {
            videoUrl = response.data.url;
        } else {
            message.reply('Error: Scandal API not working. Please try again later or use another category.');
            return;
        }
    } catch (err) {
        console.log(err);
        message.reply('Error: Scandal API not working. Please try again later or use another category.');
        return;
    }
} else {
    if (!validCategories.includes(category)) {
        message.reply("Invalid category.\nPlease choose from : Scandal, " + validCategories.join(', '));
        return;
    }

    videoUrl = videoLinks[category][Math.floor(Math.random() * videoLinks[category].length)];
}

if (category.toLowerCase() !== 'scandal') {
    videoId = videoUrl.match(/\/d\/(.+)\//)[1];
}
     


        try {
            const response = await axios({
                method: 'get',
                url: category.toLowerCase() === 'scandal' ? videoUrl : `https://drive.google.com/u/0/uc?id=${videoId}&export=download`,
                responseType: 'stream'
            });

            const tempFile = category.toLowerCase() === 'scandal' ? './temp_scandal.mp4' : `./temp_${videoId}.mp4`;
            const writer = fs.createWriteStream(tempFile);
            response.data.pipe(writer);

            const loadingMessage = await message.reply("💦🫦 Video is Buffering ⌛\nPlease wait up to 1-3m\n\nDont Spam just wait if the video is not coming after 3 minutes then try again ");

            let sendTimeout = setTimeout(async () => {
                await message.unsend(loadingMessage.messageID);
                message.reply("Error: Video took too long to send...Please try again.");
                fs.unlinkSync(tempFile);
            }, 100000);

            writer.on('finish', async () => {
                clearTimeout(sendTimeout);
                const uid = message.threadID;
                const attachmentPath = `./${uid}_${videoId}.mp4`;

                const fileStream = fs.createWriteStream(attachmentPath);
                fileStream.on('finish', async () => {
                    const sentMessage = await message.reply({
                        body: "Enjoy your 💦👀!\n\nNote:this video will be unsend after 30 minutes.\nSo be Quick🫦🫵\n\nif you wanna keep the video please forward it your own inbox 💦",
                        attachment: fs.createReadStream(attachmentPath)
                    });
                    await message.unsend(loadingMessage.messageID);
                  
                    const unsendTimeout = setTimeout(async () => {
                        await message.unsend(sentMessage.messageID);
                        
                    }, 1800000); 
                    fs.unlinkSync(tempFile);
                  fs.unlinkSync(attachmentPath);
                });
              

                fileStream.on('error', (err) => {
                    console.log(err);
                });

                fs.createReadStream(tempFile).pipe(fileStream);
            });
        } catch (err) {
            console.log(err);
            message.reply("Error: Thare is an problem with the video link\n[The API provided broken link] \n\nplease try again or use other category");
        }
    }
};