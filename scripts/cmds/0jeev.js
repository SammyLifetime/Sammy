const {createCanvas, registerFont, loadImage, Image} = require("canvas")
const fs = require("fs-extra")

module.exports = {
	config: {
		name: "jeev",
		author: "NIB",
		version: "1.1",
		cooldowns: 5,
		role: 0,
		shortDescription: {
			vi: "tạo avatar anime",
			en: "create cover"
		},
		longDescription: {
			vi: "tạo avatar anime với chữ ký",
			en: "create cover"
		},
		category: "image",
		guide: {
			vi: "{p}{n} <mã số nhân vật hoặc tên nhân vật> | <chữ nền> | <chữ ký> | <tên màu tiếng anh hoặc mã màu nền (hex color)>"
				+ "\n{p}{n} help: xem cách dùng lệnh",
			en: "{p}{n} <input1> * <input2> * <input3>"
				+ "\n{p}{n} help: view how to use this command"
		}
	},

	

	onStart: async function ({ args, message, getLang }) 
  {
    let text = args.join(" ")
    let txt = text.split("*")

try{
  let cnv = await createCanvas(2000, 800)
  let ctx = cnv.getContext("2d")
  ctx.imageSmoothingEnabled = false;
 ctx.patternQuality = 'best';
ctx.antialias = 'default';
ctx.filter = 'default';
  

registerFont(__dirname+"/assets/font/Cocogoose-Narrow/Cocogoose-Narrow-Regular-trial.ttf", {family: "Abcd"})
  registerFont(__dirname+"/assets/font/NexaRustSlab-BlackShadow01.otf", {family: "Abcde"})

let imgg = await loadImage(__dirname + "/assets/image/chingchung.png")

  
 ctx.drawImage(imgg, 0,0)
  ctx.fillStyle = 'black';
ctx.textAlign = 'center';


      var fontsize = 50;

  // lower the font size until the text fits the canvas
  do {
    fontsize--;
    ctx.font = fontsize + "px " + "Abcde";
  } while (ctx.measureText(txt[0]).width > 420)

  // draw the text
  ctx.fillText(txt[0], 628, 340)
  
ctx.font = "35px Abcd"
 ctx.fillText(txt[1], 628, 438)
     ctx.fillText(txt[2], 628, 560)
     
const imgBuffer = cnv.toBuffer('image/png') 
  let path = __dirname+"/tmp/asd.png";
 fs.writeFileSync(path, imgBuffer)
message.reply({body:"Here is your image:", attachment:fs.createReadStream(path)})
   
  }catch(e){console.log(e)
           message.reply("🙂error")}

    
  }
}