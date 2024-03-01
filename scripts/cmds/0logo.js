const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "logo",
    aliases: ["logos", "texpro"],
    version: "1.0",
    author: "Samuel Kâñèñgeè/King Monsterwith",
    countDown: 5, 
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "logo",
    guide: "{pn}"
  },
  onStart: async function ({ api, event, args, Users }) {
    let { messageID, senderID, threadID } = event;

    if (args.length >= 2 && args[0].toLowerCase() === "list") {
      let page = parseInt(args[1]);
      switch (page) {
        case 1:
          return api.sendMessage(
            `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝑒𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 1:\n\n
❍ Cake ❍ Fire ❍ Shadowsky \n❍ Metallic
❍ Naruto ❍ Pubg \n❍ Grass
❍ Harrypotter ❍ Flowers \n❍ Love
❍ Coffee ❍ Butterly \n❍ Nightsky 
❍ wood ❍ Illuminated \n❍ Candy ❍ Cup
❍ Wolf \n❍ Glass ❍ Crisp
❍ Quotes \n❍ Love2 ❍ Burnpaper 
❍ funnycup \n❍ Heart ❍ Wooden
❍ \n❍ Summer ❍ Nature ❍ Water \n\n
𝑷𝑨𝑮𝑬 1 - 4\n\n╚════ஜ۩۞۩ஜ═══╝`,
            threadID,
            messageID
          );
        case 2:
          return api.sendMessage(
            `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝑒𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 2:\n\n
❍Naturesummer ❍ Gradient ❍ Rainbow \n❍ Fur
❍ Embroidery ❍ 3drainbow \n❍ Arced
❍ Coffie2 ❍ Silk \n❍ Royal
❍ fps ❍ Glowing \n❍ Giraffe 
❍ Business ❍ Comic \n❍ Slim ❍ Halloween 
❍ Frozen \n❍ Thunder ❍ Neon
❍ Neon2 \n❍ Neon3 ❍ Golden2
❍ Transformer \n❍Whitegold ❍ Luxury
❍ Gloss \n❍ Cloud ❍ Brokenglass ❍ Blood\n\n𝑷𝑨𝑮𝑬 2 - 4\n\n╚════ஜ۩۞۩ஜ═══╝`,
            threadID,
            messageID
          );
        case 3:
          return api.sendMessage(
            `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝑒𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 3:\n\n
❍ Joker ❍ Smoke ❍ Glue \n❍ Toxic 
❍ Rain ❍ 3dstone \n❍ Rock
❍ Carbon ❍ Decorate \n❍ Duluxsilver
❍ King ❍ Biscuit \n❍ Icecold
❍ Icewinter ❍ Snow \n❍ Snow2 ❍ Decorate2
❍ Wicker \n❍ Febric  ❍ Blueglass
❍ Beach \n❍ Papercut ❍ Demin
❍ Captain \n❍ Fluid ❍ Leaves
❍ Steel \n❍ Metal ❍ Metal2 ❍ Hotmetal \n\n\n\n𝑷𝑨𝑮𝑬 3 - 4\n\n╚════ஜ۩۞۩ஜ═══╝`,
            threadID,
            messageID
          );

        case 4:
          return api.sendMessage(
            `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝑒𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 4:\n\n
❍ Hologram ❍ Crystal ❍ Glung \n❍ Paint
❍ Liquid ❍ Pink \n❍ Burger
❍ Cage ❍ Knitted \n❍ Party
❍ Christmas ❍ \n❍ Newyear
❍ Purpleglass\n\n𝑷𝑨𝑮𝑬 4 - 4\n\n╚════ஜ۩۞۩ஜ═══╝`,
            threadID,
            messageID
          );
        default:
          return api.sendMessage(
            `╔════ஜ۩۞۩ஜ═══╗\n\nInvalid page number! Please use "list 1" or "list 2" or "list 3" to view the available logo lists.\n\n╚════ஜ۩۞۩ஜ═══╝`,
            threadID,
            messageID
          );
      }
    }

    if (args.length < 2) {
      return api.sendMessage(
        `╔════ஜ۩۞۩ஜ═══╗\n\nInvalid command format! Use: logo list logo list (page number) or logo (logo name) (text)\n\n╚════ஜ۩۞۩ஜ═══╝`,
        threadID,
        messageID
      );
    }

    let type = args[0].toLowerCase();
    let text = args.slice(1).join(" ");
    let pathImg = __dirname + `/cache/${type}_${text}.png`;
    let apiUrl, message;

    switch (type) {
     case "cake":
      apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/cake?text=${text}`;
      message = "here's the [CAKE] Logo created:";
      break; 
         case "newyear":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=84&text=${text}`;
        message = "Here's the [NEWYEAR] Logo created:";
        break;
     case "purpleglass":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=85&text=${text}`;
        message = "Here's the [PURPLEGLASS] Logo created:";
        break;

         case "party":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=82&text=${text}`;
        message = "Here's the [PARTY] Logo created:";
        break;
     case "Christmas":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=83&text=${text}`;
        message = "Here's the [CHRISTMAS] Logo created:";
        break;

         case "burger":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=78&text=${text}`;
        message = "Here's the [BURGER] Logo created:";
        break;
     case "cage":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=79&text=${text}`;
        message = "Here's the [CAGE] Logo created:";
        break;
     case "knitted":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=80&text=${text}`;
        message = "Here's the [KNITTED] Logo created:";
        break;

         case "crystal":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=73&text=${text}`;
        message = "Here's the [CRYSTAL] Logo created:";
        break;

      case "hologram":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=72&text=${text}`;
        message = "Here's the [HOLOGRAM] Logo created:";
        break;

         case "hotmetal":
        apiUrl = `=${text}`;
        message = "Here's the [HOTMETAL] Logo created:";
        break;
     case "metal2":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=67&text=${text}`;
        message = "Here's the [METAL2] Logo created:";
        break;
     case "paint":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=75&text=${text}`;
        message = "Here's the [PAINT] Logo created:";
        break;
     case "glung":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=74&text=${text}`;
        message = "Here's the [GLUNG] Logo created:";
        break;
     case "pink":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=76&text=${text}`;
        message = "Here's the [PINK] Logo created:";
        break;
     case "liquid":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=77&text=${text}`;
        message = "Here's the [LIQUID] Logo created:";
        break;

         case "fluid":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=61&text=${text}`;
        message = "Here's the [FLUID] Logo created:";
        break;
     case "leaves":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=60&text=${text}`;
        message = "Here's the [LEAVES] Logo created:";
        break;
     case "steel":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=64&text=${text}`;
        message = "Here's the [STEEL] Logo created:";
        break;
     case "metal":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=63&text=${text}`;
        message = "Here's the [METAL] Logo created:";
        break;

         case "demin":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=59&text=${text}`;
        message = "Here's the [DEMIN] Logo created:";
        break;
     case "captain":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=57&text=${text}`;
        message = "Here's the [CAPTAIN] Logo created:";
        break;

         case "beach":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=55&text=${text}`;
        message = "Here's the [BEACH] Logo created:";
        break;
     case "papercut":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=56&text=${text}`;
        message = "Here's the [PAPERCUT] Logo created:";
        break;

         case "decorate2":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=50&text=${text}`;
        message = "Here's the [DECORATE2] Logo created:";
        break;
     case "wicker":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=49&text=${text}`;
        message = "Here's the [WICKER] Logo created:";
        break;

     case "febric":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=51&text=${text}`;
        message = "Here's the [FEBRIC] Logo created:";
        break;
     case "blueglass":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=52&text=${text}`;
        message = "Here's the [BLUEGLASS] Logo created:";
        break;

         case "icewinter":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=46&text=${text}`;
        message = "Here's the [ICEWINTER] Logo created:";
        break;
     case "snow":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=48&text=${text}`;
        message = "Here's the [SNOW] Logo created:";
        break;
     case "snow2":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=47&text=${text}`;
        message = "Here's the [SNOW2] Logo created:";
        break;

         case "icecold":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=45&text=${text}`;
        message = "Here's the [ICECOLD] Logo created:";
        break;

         case "king":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=40&text=${text}`;
        message = "Here's the [👑 KING] Logo created:";
        break;
     case "biscuit":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=44&text=${text}`;
        message = "Here's the [BISCUITS] Logo created:";
        break;

         case "whitegold":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=18&text=${text}`;
        message = "Here's the [WHITEGOLD] Logo created:";
        break;
     case "duluxsilver":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=39&text=${text}`;
        message = "Here's the [DULUXSILVER] Logo created:";
        break;
     case "decorate":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=36&text=${text}`;
        message = "Here's the [DECORATE] Logo created:";
        break;
     case "carbon":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=35&text=${text}`;
        message = "Here's the [CARBON] Logo created:";
        break;
     case "rock":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=34&text=${text}`;
        message = "Here's the [ROCK] Logo created:";
        break;
     case "3dstone":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=33&text=${text}`;
        message = "Here's the [3DSTONE] Logo created:";
        break;
     case "rain":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=32&text=${text}`;
        message = "Here's the [RAIN] Logo created:";
        break;
     case "toxic":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=31&text=${text}`;
        message = "Here's the [TOXIC] Logo created:";
        break;
     case "glue":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=30&text=${text}`;
        message = "Here's the [GLUE] Logo created:";
        break;
     case "joker":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=29&text=${text}`;
        message = "Here's the [JOKER] Logo created:";
        break;
     case "blood":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=27&text=${text}`;
        message = "Here's the [BLOOD] Logo created:";
        break;
     case "brokenglass":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=22&text=${text}`;
        message = "Here's the [BROKENGLASS] Logo created:";
        break;
     case "luxury":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=19&text=${text}`;
        message = "Here's the [LUXURY] Logo created:";
        break;
     case "cloud":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=21&text=${text}`;
        message = "Here's the [CLOUD] Logo created:";
        break;
     case "gloss":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=20&text=${text}`;
        message = "Here's the [GLOSS] Logo created:";
        break;

         case "thunder":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=11&text=${text}`;
        message = "Here's the [THUNDER] Logo created:";
        break;
     case "neon":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=12&text=${text}`;
        message = "Here's the [NEON] Logo created:";
        break;
     case "neon2":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=13&text=${text}`;
        message = "Here's the [NEON2] Logo created:";
        break;
     case "neon3":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=14&text=${text}`;
        message = "Here's the [NEON3] Logo created:";
        break;
     case "transformer":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=16&text=${text}`;
        message = "Here's the [TRANSFORMER] Logo created:";
        break;
     case "golden2":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=17&text=${text}`;
        message = "Here's the [GOLDEN] Logo created:";
        break;

         case "frozen":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=10&text=${text}`;
        message = "Here's the [FROZEN] Logo created:";
        break;

         case "halloween":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=9&text=${text}`;
        message = "Here's the [HALLOWEEN] Logo created:";
        break;

         case "comic":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=7&text=${text}`;
        message = "Here's the [Comic] Logo created:";
        break;
     case "orange":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=6&text=${text}`;
        message = "Here's the [ORANGE] Logo created:";
        break;
     case "slim":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=8&text=${text}`;
        message = "Here's the [SLIM] Logo created:";
        break;

         case "glowing":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=2&text=${text}`;
        message = "Here's the [GLOWING] Logo created:";
        break;
     case "giraffe":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=3&text=${text}`;
        message = "Here's the [GIRAFFE] Logo created:";
        break;
     case "business":
        apiUrl = `https://textpro-api-by-faheem.replit.app/api/textpro?number=5&text=${text}`;
        message = "Here's the [Business] Logo created:";
        break;

     case "fire":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/flaming?text=${text}`;
        message = "Here's the [FIRE] Logo created:";
        break;
     case "Shadowsky":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/shadow-sky?text=${text}`;
        message = "Here's the [SHADOWSKY] Logo created:";
        break;
         case "metallic":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/metallic?text=${text}`;
        message = "Here's the [METALLIC] Logo created:";
        break; 
      case "naruto":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/naruto?text=${text}`;
        message = "Here's the [NARUTO] Logo created:";
        break;
     case "pubg":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/pubg?text=Pubg&text2=${text}`;
        message = "Here's the [PUBG] Logo created:";
        break;
     case "grass":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/under-grass?text=${text}`;
        message = "Here's the [GRASS] Logo created:";
        break;
     case "harrypotter":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/harry-potter?text=${text}`;
        message = "Here's the [HARRYPOTTER] Logo created:";
        break;
     case "flowers":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/flower-typography?text=${text}`;
        message = "Here's the [FLOWERS] Logo created:";
        break;
     case "love":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/picture-of-love?text=${text}`;
        message = "Here's the [LOVE] Logo created:";
        break;
     case "coffee":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/coffee-cup?text=${text}`;
        message = "Here's the [COFFEE] Logo created:";
        break;
     case "butterfly":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/butterfly?text=${text}`;
        message = "Here's the [BUTTERFLY] Logo created:";
        break;
     case "nightsky":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/night-sky?text=${text}`;
        message = "Here's the [NIGHTSKY] Logo created:";
        break;
     case "wood":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/carved-wood?text=${text}`;
        message = "Here's the [WOOD] Logo created:";
        break;
     case "illuminated":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/illuminated-metallic?text=${text}`;
        message = "Here's the [ILLUMINATED] Logo created:";
        break;
     case "candy":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/sweet-candy?text=${text}`;
        message = "Here's the [CANDY] Logo created:";
        break;
     case "cup":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/cup?text=${text}`;
        message = "Here's the [CUP] Logo created:";
        break;
     case "wolf":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/wolf-metal?text=${text}`;
        message = "Here's the [WOLF] Logo created:";
        break;
     case "Glass":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/glass?text=${text}`;
        message = "Here's the [GLASS] Logo created:";
        break;
     case "crisp":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/crisp-chrome?text=${text}`;
        message = "Here's the [CRISP] Logo created:";
        break;
     case "quotes":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/quotes?text=${text}`;
        message = "Here's the [QUOTES] Logo created:";
        break;
     case "love2":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/love-message?text=${text}`;
        message = "Here's the [LOVE2] Logo created:";
        break;
     case "burnpaper":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/burn-paper?text=${text}`;
        message = "Here's the [BURNPAPER] Logo created:";
        break;
     case "funnycup":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/funny-cup?text=${text}`;
        message = "Here's the [FUNCUP] Logo created:";
        break;
     case "heart":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/double-heart?text=${text}`;
        message = "Here's the [HEART] Logo created:";
        break;
     case "love3":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/quote-wood?text=${text}`;
        message = "Here's the [LOVE3] Logo created:";
        break;
     case "wooden":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/wooden-board?text=${text}`;
        message = "Here's the [WOODEN] Logo created:";
        break;
     case "summer":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/summer?text=${text}`;
        message = "Here's the [SUMMER] Logo created:";
        break;
     case "water":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/water?text=${text}`;
        message = "Here's the [WATER] Logo created:";
        break;
     case "nature":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/nature?text=${text}`;
        message = "Here's the [NATURE] Logo created:";
        break;
     case "goldenrose":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/golden-rose?text=${text}`;
        message = "Here's the [GOLDEN ROSE] Logo created:";
        break;
     case "naturesummer":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/nature-summer?text=${text}`;
        message = "Here's the [NATURESUMMER] Logo created:";
        break;
     case "gradient":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/gridiant-avatar?text=${text}`;
        message = "Here's the [GRADIENT] Logo created:";
        break;
     case "rainbow":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/rainbow-glow?text=${text}`;
        message = "Here's the [RAINBOW] Logo created:";
        break;
         case "fur":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/fur-text?text=${text}`;
        message = "Here's the [FUR] Logo created:";
        break;
     case "embroidery":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/embroidery-text?text=${text}`;
        message = "Here's the [EMBROIDERY] Logo created:";
        break;
     case "3drainbow":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/3d-rainbow?text=${text}`;
        message = "Here's the [RAINBOW] Logo created:";
        break;
     case "arced":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/arced-rafit?text=${text}&text2=${text}`;
        message = "Here's the [ARCED] Logo created:";
        break;
     case "coffie2":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/coffie-logo?text=${text}`;
        message = "Here's the [COFFIE2] Logo created:";
        break;
     case "smoke":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/smoke?text=${text}`;
        message = "Here's the [SMOKE] Logo created:";
        break;
     case "silk":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/silk?text=${text}`;
        message = "Here's the [SILK] Logo created:";
        break;

     case "royal":
        apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/royal-patterns?text=${text}`;
        message = "Here's the [] Logo created:";
        break;

    case "fps":
      apiUrl = `https://photooxy-api-by-faheem.replit.app/api/photooxy/fps-game?text=${text}&text2=${text}`;
      message = "here's the [] Logo created:";


        break;
      default:
        return api.sendMessage(
          `╔════ஜ۩۞۩ஜ═══╗\n\nInvalid logo type! Use "list 1" to see the list of textpro logos.\n\n╚════ஜ۩۞۩ஜ═══╝`,
          threadID,
          messageID
        );
    }

    try {
      let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(pathImg, Buffer.from(response.data, "binary"));

      return api.sendMessage(
        {
          attachment: fs.createReadStream(pathImg),
          body: message
        },
        threadID,
        () => fs.unlinkSync(pathImg)
      );
    } catch (err) {
      console.error(err);
      return api.sendMessage(
        `╔════ஜ۩۞۩ஜ═══╗\n\nAn error occurred while generating the logo. Please try again later.\n\n╚════ஜ۩۞۩ஜ═══╝`,
        threadID,
        messageID
      );
    }
  },
};