const { createCanvas, registerFont, loadImage } = require("canvas");
const sizeOf = require('buffer-image-size');
const fs = require("fs");
const axios = require("axios");


module.exports = {
  config: {
    name: "baal",
    version: "1.1",
    author: "Samuel",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Tạo hình ảnh với văn bản trên ảnh",
      en: "Create an image with text on top of it"
    },
    longDescription: {
      vi: "Lệnh này cho phép bạn tạo hình ảnh với văn bản trên ảnh. Bạn cần đính kèm ảnh và nhập văn bản muốn hiển thị lên ảnh.",
      en: "This command allows you to create an image with text on top of it. You need to attach an image and input the text you want to display on the image."
    },
    category: "Image",
    guide: {
      en: "{pn} <id> | <name> | <color(optional)>"
    },
  },
  onStart: async function ({ event, message, getLang, usersData, api, args }) {
    if ((event.type == "message_reply") && (event.messageReply.attachments.length > 0) && (event.messageReply.attachments[0].type == "photo")) {
      if (args.length == 0) return message.reply("add something to write baka");

      let arr = args.join(" ").split("|");
      if (arr.length < 2) return message.send("Wrong Syntax");

      try {
        let imageResponse = await axios.get(event.messageReply.attachments[0].url, { responseType: "arraybuffer" });
        let ig = Buffer.from(imageResponse.data);
        let logooResponse = await axios.get("https://i.ibb.co/khkcTBw/20221213-161950.png", { responseType: "arraybuffer" });
        let logoo = Buffer.from(logooResponse.data);

        var dmns = sizeOf(ig);
        await registerFont(`${__dirname}/Ador.ttf`, {
          family: "Ador"
        });
        let cnv = await createCanvas(dmns.width, dmns.height + 100);
        let ctx = cnv.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.patternQuality = 'best';
        ctx.antialias = 'default';
        ctx.filter = 'default';
        let rgb = await getAverageRGB(ig);

        ctx.fillStyle = rgb;
        ctx.fillRect(0, 0, cnv.width, cnv.height);

        let pg = await loadImage(ig);
        let logo = await loadImage(logoo);
        ctx.drawImage(pg, 0, 0);

        ctx.font = '30px "Ador"';
        let y = cnv.height - 160;
        let mns = parseInt(ctx.font) + 5;

        let arr2 = arr[0].split("\n").reverse();

        for (var txt of arr2) {
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#fff';

          var width = ctx.measureText(txt).width;

          ctx.fillRect(30, y - (parseInt(ctx.font) / 2), width, parseInt(ctx.font));

          ctx.fillStyle = '#000';
          ctx.fillText(txt, 30, y);
          y = y - mns;
        }

        ctx.font = '20px "Arial"';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, cnv.height - 101, cnv.width, 3);
        let tclr = await getTextColor(rgb);
        ctx.fillStyle = tclr;
        ctx.fillText(arr[1], 30, cnv.height - 50);

        await ctx.drawImage(logo, cnv.width - 100, cnv.height - 100);

        const imgBuffer = cnv.toBuffer('image/png');

        await fs.writeFileSync(__dirname + "/tmp/lyricsCard.png", imgBuffer);
        message.reply({ attachment: fs.createReadStream(__dirname + "/tmp/lyricsCard.png") });

      } catch (e) {console.log(e);
      }
    } else {
      message.reply("Please reply to a photo message.");
    }
  }
};