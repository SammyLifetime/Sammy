const {createCanvas, registerFont, loadImage, Image} = require("canvas")


const fs = require("fs")
const axios = require("axios")


module.exports = {
	config: {
		name: "pubg",
		version: "1.1",
		author: "NIB & SOUROV",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: ""
		},
		longDescription: {
			vi: "",
			en: ""
		},
		category: "",
		guide : {
      en: "{pn} <id> | <name> | <color(optional)>"
},
		
	},

onStart: async function ({ event, message, getLang, usersData, api, args}) {

let inpp = args.join(" ").split("|")
if(!inpp || inpp.length < 2 || isNaN(Number(inpp[0]))) return (message.reply("Use correct Syntax"))

  let itm = jsn.find(e => e.id == inpp[0])
  if(!itm) return message.reply("That id doesn’t exist")
let inp = inpp[1].trim()

  let clr = ""
  if(inpp[2]){clr = inpp[2].trim()} else{clr =itm.clr||"white"}
  console.log(clr)
  try{
         let ig = (await axios.get(encodeURI(
            itm.url), { responseType: "arraybuffer" })
    ).data;
   await registerFont(`Vampire Wars.ttf`, {
            family: "Abcd"
        });
  let cnv = await createCanvas(1080, 1080)
  let ctx = cnv.getContext("2d")
  ctx.imageSmoothingEnabled = false;
 ctx.patternQuality = 'best';
ctx.antialias = 'default';
ctx.filter = 'default';
  



let bg = await loadImage("bg.png")
let pg = await loadImage(ig)
  
        
 ctx.drawImage(bg, 0,0, 1080,1080)

var fontsize = 130;

  // lower the font size until the text fits the canvas
  do {
    fontsize--;
    ctx.font = fontsize + "pt " + "Abcd";
  } while (ctx.measureText(inp).width > cnv.width-16)
    
    // ctx.font = '130pt "Abcd"';
    
  ctx.fillStyle = clr;
ctx.textAlign = 'center';
ctx.strokeStyle = "white"
     ctx.lineWidth = 2
// ctx.strokeText(inp, cidth/2, 308)
     ctx.strokeText(inp, cnv.width/2, 432)
     ctx.strokeText(inp, cnv.width/2, 708)
    
     ctx.fillText(inp, cnv.width/2, 574)

      

    // let txt = text.split("*")
  // lower the font size until the text fits the canvas
  

  // draw the text
  
  

  ctx.drawImage(pg, 0, 0, 1080, 1080)
    
    ctx.strokeText(inp, cnv.width/2, 574)
     const imgBuffer = cnv.toBuffer('image/png') 
  


  await fs.writeFileSync(__dirname + "/tmp/asd.png", imgBuffer)
 // fs.writeFileSync('asd.png', imgBuffer)
message.reply({body:`✅ Your PUBG  Avatar
ID: ${itm.id}
Background text: ${inp.trim()}
Color: ${clr}`,attachment:fs.createReadStream(__dirname + "/tmp/asd.png")})
   
  }catch(e){console.log(e)}
}
};

   let jsn = 
[
  {
    "id": 1,
    "url": "https://i.ibb.co/1zW5rJd/193b81f47906046e429dbf0334171866.jpg",
    "clr": "#383f29"
  },
  {
    "id": 2,
    "url": "https://i.ibb.co/Lzz4ghC/10.png",
    "clr": "#033b74"
  },
  {
    "id": 3,
    "url": "https://i.ibb.co/wWcsQrW/11.png",
    "clr": "#326a97"
  },
  {
    "id": 4,
    "url": "https://i.ibb.co/FbLk65V/12.png",
    "clr": "#7c0000"
  },
  {
    "id": 5,
    "url": "https://i.ibb.co/rQ7Wjk5/13.png",
    "clr": "#7c0000"
  },
  {
    "id": 6,
    "url": "https://i.ibb.co/P5c54m2/14.png",
    "clr": "#8c1c4c"
  },
  {
    "id": 7,
    "url": "https://i.ibb.co/3dR24ns/15.png",
    "clr": "#7c0000"
  },
  {
    "id": 8,
    "url": "https://i.ibb.co/yfsVwbM/16.png",
    "clr": "#7c0000"
  },
  {
    "id": 9,
    "url": "https://i.ibb.co/RYn5bnY/17.png",
    "clr": "#7c0000"
  },
  {
    "id": 10,
    "url": "https://i.ibb.co/W0wsBqc/18.png",
    "clr": "#383e02"
  },
  {
    "id": 11,
    "url": "https://i.ibb.co/ky8xMWY/19.png",
    "clr": "#dea438"
  },
  {
    "id": 12,
    "url": "https://i.ibb.co/y5z1NmV/02.png",
    "clr": "#383e02"
  },
  {
    "id": 13,
    "url": "https://i.ibb.co/GF7rrTS/20.png",
    "clr": "#075fbc"
  },
  {
    "id": 14,
    "url": "https://i.ibb.co/9WqCRQ7/21.png",
    "clr": "#c20200"
  },
  {
    "id": 15,
    "url": "https://i.ibb.co/qdr0svq/22.png",
    "clr": "#326a97"
  },
  {
    "id": 16,
    "url": "https://i.ibb.co/1GkhMS7/23.png",
    "clr": "#dea438"
  },
  {
    "id": 17,
    "url": "https://i.ibb.co/jVdXxN3/24.png",
    "clr": "#326a97"
  },
  {
    "id": 18,
    "url": "https://i.ibb.co/g6HjhBH/25.png",
    "clr": "#0e0bbb"
  },
  {
    "id": 19,
    "url": "https://i.ibb.co/QM27RcQ/26.png",
    "clr": "#857773"
  },
  {
    "id": 20,
    "url": "https://i.ibb.co/5cgcmhD/27.png",
    "clr": "#f3d40c"
  },
  {
    "id": 21,
    "url": "https://i.ibb.co/M9t4Jct/28.png",
    "clr": "#65372d"
  },
  {
    "id": 22,
    "url": "https://i.ibb.co/rxzkpJs/29.png",
    "clr": "#9901db"
  },
  {
    "id": 23,
    "url": "https://i.ibb.co/6JchNMV/03.png",
    "clr": "#6f7999"
  },
  {
    "id": 24,
    "url": "https://i.ibb.co/2gpbgrn/30.png",
    "clr": "#8dacd9"
  },
  {
    "id": 25,
    "url": "https://i.ibb.co/8rHz7cC/31.png",
    "clr": "#ac4c0f"
  },
  {
    "id": 26,
    "url": "https://i.ibb.co/bFvzw3g/32.png",
    "clr": "#af0b1e"
  },
  {
    "id": 27,
    "url": "https://i.ibb.co/3WLG8SK/33.png",
    "clr": "#3c72e0"
  },
  {
    "id": 28,
    "url": "https://i.ibb.co/fpPjZK7/34.png",
    "clr": "#d01597"
  },
  {
    "id": 29,
    "url": "https://i.ibb.co/58LcKcy/35.png",
    "clr": "#d01597"
  },
  {
    "id": 30,
    "url": "https://i.ibb.co/vLyhxtR/36.png",
    "clr": "#c5ae68"
  },
  {
    "id": 31,
    "url": "https://i.ibb.co/D8y1Jt3/04.png",
    "clr": "#dbc36c"
  },
  {
    "id": 32,
    "url": "https://i.ibb.co/BZ6SZxG/05.png",
    "clr": "#c30102"
  },
  {
    "id": 33,
    "url": "https://i.ibb.co/WPRR3jx/06.png",
    "clr": "#383c6d"
  },
  {
    "id": 34,
    "url": "https://i.ibb.co/58Xsp3j/07.png",
    "clr": "#143a7b"
  },
  {
    "id": 35,
    "url": "https://i.ibb.co/wy2rhz2/08.png",
    "clr": "#7daed6"
  },
  {
    "id": 36,
    "url": "https://i.ibb.co/pwhRhCV/09.png",
    "clr": "#6f5f4f"
  },
  {
    "id": 37,
    "url": "https://i.ibb.co/YWwhGdf/01.png"
  },
  {
    "id": 38,
    "url": "https://i.ibb.co/yq7k0Dt/02.png"
  },
  {
    "id": 39,
    "url": "https://i.ibb.co/wwQH8SS/03.png"
  },
  {
    "id": 40,
    "url": "https://i.ibb.co/kKSN1NX/04.png"
  },
  {
    "id": 41,
    "url": "https://i.ibb.co/KNT46hy/05.png"
  },
  {
    "id": 42,
    "url": "https://i.ibb.co/7z4NpGb/06.png"
  },
  {
    "id": 43,
    "url": "https://i.ibb.co/mBHg7JM/07.png"
  },
  {
    "id": 44,
    "url": "https://i.ibb.co/tMcM0YS/08.png"
  },
  {
    "id": 45,
    "url": "https://i.ibb.co/3FyPp2Z/09.png"
  },
  {
    "id": 46,
    "url": "https://i.ibb.co/FDf2rpD/10.png"
  },
  {
    "id": 47,
    "url": "https://i.ibb.co/vwnCDGf/11.png"
  },
  {
    "id": 48,
    "url": "https://i.ibb.co/C801Zxx/12.png"
  },
  {
    "id": 49,
    "url": "https://i.ibb.co/VgffJ52/13.png"
  },
  {
    "id": 50,
    "url": "https://i.ibb.co/QbCNTFZ/14.png"
  },
  {
    "id": 51,
    "url": "https://i.ibb.co/61B0h7M/15.png"
  },
  {
    "id": 52,
    "url": "https://i.ibb.co/z6STmtQ/16.png"
  },
  {
    "id": 53,
    "url": "https://i.ibb.co/YXCkqY4/17.png"
  },
  {
    "id": 54,
    "url": "https://i.ibb.co/G2Mkxph/18.png"
  },
  {
    "id": 55,
    "url": "https://i.ibb.co/qd7TTDk/19.png"
  },
  {
    "id": 56,
    "url": "https://i.ibb.co/Bs2TRqM/20.png"
  },
  {
    "id": 57,
    "url": "https://i.ibb.co/s9hgxg0/21.png"
  },
  {
    "id": 58,
    "url": "https://i.ibb.co/wN8MF34/22.png"
  },
  {
    "id": 59,
    "url": "https://i.ibb.co/kx6ZBH0/23.png"
  },
  {
    "id": 60,
    "url": "https://i.ibb.co/d4Vq1yM/24.png"
  },
  {
    "id": 61,
    "url": "https://i.ibb.co/KmRGGYy/25.png"
  },
  {
    "id": 62,
    "url": "https://i.ibb.co/w0p2DQz/26.png"
  },
  {
    "id": 63,
    "url": "https://i.ibb.co/6JnJPLD/27.png"
  },
  {
    "id": 64,
    "url": "https://i.ibb.co/g6DvS9W/28.png"
  },
  {
    "id": 65,
    "url": "https://i.ibb.co/Bz0PTgt/29.png"
  },
  {
    "id": 66,
    "url": "https://i.ibb.co/7JL7Rtm/30.png"
  },
  {
    "id": 67,
    "url": "https://i.ibb.co/2kdn5gV/31.png"
  },
  {
    "id": 68,
    "url": "https://i.ibb.co/GPQrn1K/32.png"
  },
  {
    "id": 69,
    "url": "https://i.ibb.co/Rg5JjnF/33.png"
  },
  {
    "id": 70,
    "url": "https://i.ibb.co/BnVh0C3/34.png"
  },
  {
    "id": 71,
    "url": "https://i.ibb.co/DtxL527/35.png"
  },
  {
    "id": 72,
    "url": "https://i.ibb.co/4FqNxv9/36.png"
  },
  {
    "id": 73,
    "url": "https://i.ibb.co/30fmRS7/37.png"
  },
  {
    "id": 74,
    "url": "https://i.ibb.co/wdwhQP9/38.png"
  },
  {
    "id": 75,
    "url": "https://i.ibb.co/7CGQKYt/39.png"
  },
  {
    "id": 76,
    "url": "https://i.ibb.co/xgPrGrK/40.png"
  },
  {
    "id": 77,
    "url": "https://i.ibb.co/80L1c6y/41.png"
  },
  {
    "id": 78,
    "url": "https://i.ibb.co/rcQ4qGQ/42.png"
  },
  {
    "id": 79,
    "url": "https://i.ibb.co/4Y3qtQD/43.png"
  },
  {
    "id": 80,
    "url": "https://i.ibb.co/wRG5d8X/44.png"
  },
  {
    "id": 81,
    "url": "https://i.ibb.co/RSMBYKY/45.png"
  },
  {
    "id": 82,
    "url": "https://i.ibb.co/hsTYKKJ/46.png"
  },
  {
    "id": 83,
    "url": "https://i.ibb.co/f9ypxJg/47.png"
  },
  {
    "id": 84,
    "url": "https://i.ibb.co/GMPK865/48.png"
  },
  {
    "id": 85,
    "url": "https://i.ibb.co/t8CTxhs/49.png"
  },
  {
    "id": 86,
    "url": "https://i.ibb.co/6NgHR7y/50.png"
  },
  {
    "id": 87,
    "url": "https://i.ibb.co/B47SXgf/51.png"
  },
  {
    "id": 88,
    "url": "https://i.ibb.co/B3R4Xgz/52.png"
  },
  {
    "id": 89,
    "url": "https://i.ibb.co/ykqPLKW/53.png"
  },
  {
    "id": 90,
    "url": "https://i.ibb.co/tbtyCNC/54.png"
  },
  {
    "id": 91,
    "url": "https://i.ibb.co/KFjhJcW/55.png"
  },
  {
    "id": 92,
    "url": "https://i.ibb.co/GscZkB2/56.png"
  }
]