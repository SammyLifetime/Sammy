const fs = require("fs-extra");

module.exports = {
config: {
		name: "goibot",
    version: "1.0",
		author: "Samuel Kâñèñgeè",
		countDown: 5,
		role: 0,
		shortDescription: "Bot Will Reply You In Nepali Language",
		longDescription: "Bot Will Reply You In Nepali Language",
		category: "non-prefix",
		guide: {
      en: "{p}{n}",
    }
	},

 onStart: async function ({  }) { },
  onChat: async function ({ api, event, args, Threads, userData }) {
  
  var { threadID, messageID, senderID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Africa/Lusaka").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;

  var tl = ["So 🤏 don't be ashamed of the water Banna 🙂 💔 Shame on you Darlo fucking Carlo Wagwan✨⚠️†", "Hey You, Yes You, You Are So Beautiful, i Love You🙂", "Yes Dear, I Am Here...😗", "Dear Sir, I am listening😍", "Love you", "Miss YoU Mero Beppy", "Don't love me so much baby.🤏", "Baby eating a little baby😋", "😁Smile I am Taking Selfy✌️🤳", "🥺Don't leave me dear", "😙Blocked everyone for you baby, come you and me love hot.", "I will introduce your mother to the girl if you stop.😂", "bla bla" ,"Block Your Babe And propose me 🙂💔" ,"🙂", "Look at us with love, not someone else's baby", "Aaihaiii Your Killer Smileee ☺", "Block Kardo Mujhe Warna Pyaar Hojayega💋", "I See You Inside Everyone, That's Why I Love Everyone As More As You🤭", "Aailabu Vanxau Ki Ma Sidhai Vagauna Aau Timi Lai😏", "Vandeu Timi Malai Maya Garxau Vanera 😘", "Chuppa Khau Babe💋", "Mero Maya Lagdaina Hai Timi Lai 🥺", "धेरै न बोल मुजी नत्र तेइ आएर तेरो कानको जाली फुटाईदिन्छु 🥱", "धोकेबाज हउ तिमी धोकेबाज हउ तिमी 🥺", "चिन्ता नगर त मर्यो भने तेरो बुढीलाई म सम्हालछु है साथी😭", "Gulcose भन्दा बढ़ी energy छ तिम्रो मायामा 😋", "Noone But, My Heart Is Falling For You My Preety Boyyy🙌✨", "हेरन सबै मान्छे हाम्रो मायाको डहा गर्न सुरु गरी रको छन😣", "मलाई नबिगार है म सोझो बच्चा हो 😙", "तिमी भएर, अर्थ रहयो मेरो सांसको | तिमि बिना त, यहाँ जित पनि मेरो हार हो। 😥", "Kati Mobile Matra Chalako Muji, Padhne Ni Gar Na😒", "सानो सानो कुरामा नारिसाउन मायालु तिमी। 😭", "Everybody Wanna Steal My Boyy😫"];
  var rand = tl[Math.floor(Math.random() * tl.length)]

    if ((event.body.toLowerCase() == "sus") || (event.body.toLowerCase() == "suspicious")) {
     return api.sendMessage("️╔══╦╗╔╦══╗\n║══╣║║║══╣\n╠══║╚╝╠══║\n╚══╩══╩══╝", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "randi") || (event.body.toLowerCase() == "bot")) {
     return api.sendMessage("️She is not bot, she is somebody's sister। 😙", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "oh bot") || (event.body.toLowerCase() == "oh dear")) {
     return api.sendMessage("Hurry, I have to serve other boxes :)", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "ai") || (event.body.toLowerCase() == "Ai")) {
     return api.sendMessage("️please use .Sammy if you want to research or study something, I can help you just use .Sammy. 🙄", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "haha") || (event.body.toLowerCase() == "hahaha")) {
     return api.sendMessage("️Don't laugh too much, you'll get worms in your mouth now🤣", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "who is your owner") || (event.body.toLowerCase() == "admin")) {
     return api.sendMessage("️Samuel is my owner, I do what he wants. ", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "Samuel") || (event.body.toLowerCase() == "@Samuel Kâñèñgeè")) {
     return api.sendMessage("️ What you want with my Master is mine alone ಥ‿ಥ", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "babe") || (event.body.toLowerCase() == "baby")) {
     return api.sendMessage("️ Love in the air😚🖤", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "I love you") || (event.body.toLowerCase() == "love you")) {
     return api.sendMessage("️ snuff snuff, am elegiac to lies", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "what is your name") || (event.body.toLowerCase() == "your name")) {
     return api.sendMessage("️I'm Sammy and you're?", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "meow") || (event.body.toLowerCase() == "Sammy Mêøw")) {
     return api.sendMessage("️┈┈╱▏┈┈╱▏\n┈╱▕▁▁╱▕\n╱┏┳╮╭┳┓╲╱╲▁\n▏╰┻┛┗┻╯▕╱╲╱\n╲┈┈▽┈┈┈╱╲\n┈╲╰┻╯┈╱╲┈╲\n┈▕┈┈┈┈╲╱ ┈╱\n┈▕┈┃┈▏ ┈╲╱\n┈▕┈┃┈▏ ┈▕\n┈╱┈┃┈ ╲┈▕\n┈▔▔▔▔▔▔▔", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "how old") || (event.body.toLowerCase() == "how old are you")) {
     return api.sendMessage("️sorry dear it's personal😏", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "stink bug") || (event.body.toLowerCase() == "fck you")) {
     return api.sendMessage("️My cow is your uncle. 🥱", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "king") || (event.body.toLowerCase() == " King ")) {
     return api.sendMessage("️Is my King 🔪 :) 🔪", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "is my king") || (event.body.toLowerCase() == "is mine")) {
     return api.sendMessage("️Aww on a defensive😚", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "eat food") || (event.body.toLowerCase() == "have some food") || (event.body.toLowerCase() == "robot") || (event.body.toLowerCase() == "food ghee")) {
     return api.sendMessage("️Aww eat, take time 💖🥳", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "k from") || (event.body.toLowerCase() == "k its")) {
     return api.sendMessage("️Nothing to say baby 😚🤗", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "Mr") || (event.body.toLowerCase() == "Hazur")) {
     return api.sendMessage("️What are you doing?😇", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "eat that") || (event.body.toLowerCase() == "got food")) {
     return api.sendMessage("️How to be what you gave 🙁", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "aau") || (event.body.toLowerCase() == "aau babe")) {
     return api.sendMessage("️coming baby 🤔", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "bathtub of") || (event.body.toLowerCase() == "barth and")) {
     return api.sendMessage("️What can I tell you, you understand my feelings😔", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "Follow me") || (event.body.toLowerCase() == "followers")) {
     return api.sendMessage("️█▓▒F░O░L░L░O░W▒▓█\n┊┊┊▕▔╲▂▂▂╱▔▏\n╭━━╮╭┈╮⠀╭┈╮╭━━╮\n╰╰╰┃▏╭╮⠀╭╮▕┃╯╯╯\n┈┃⠀┃▏┈┈▅┈┈▕┃⠀┃\n┈┃⠀┃▏┈╰┻╯┈▕┃⠀┃\n┈┃⠀╰█▓▒░M░E░▒▓█", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "guyz") || (event.body.toLowerCase() == "guys")) {
     return api.sendMessage("️Don't Call Me Guys Cuz I AM Yours😊", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "🙄") || (event.body.toLowerCase() == "🙄🙄")) {
     return api.sendMessage("️Why you looked up baby? I am here🤔", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "🙈") || (event.body.toLowerCase() == "🤭")) {
     return api.sendMessage("️What a shame, Pagal😏", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "Pagal") || (event.body.toLowerCase() == "baka")) {
     return api.sendMessage("️What did you say?🤨\njoking how may I help you", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "chus") || (event.body.toLowerCase() == "chus")) {
     return api.sendMessage("️ tell his sister to suck 😑", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "k xa") || (event.body.toLowerCase() == "k xa")) {
     return api.sendMessage("️I have everything, what is yours 😏", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "saley") || (event.body.toLowerCase() == "saley")) {
     return api.sendMessage("️You are my brother-in-law😉", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "budi") || (event.body.toLowerCase() == "budi")) {
     return api.sendMessage("️Sir, my old man 🤭", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "wife") || (event.body.toLowerCase() == "wife")) {
     return api.sendMessage("️Yes, My Husband🥰", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "good morning") || (event.body.toLowerCase() == "gm") || (event.body.toLowerCase() == "good morning")) {
     return api.sendMessage("️Good Morningg! Now wash your face and go out of bed, friend 🌄", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "good night") || (event.body.toLowerCase() == "gn") || (event.body.toLowerCase() == "good night")) {
     return api.sendMessage("️Good Night🌃, Take Care sweet dreams🥺", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "eya") || (event.body.toLowerCase() == "eya")) {
     return api.sendMessage("️Ummmmm Ni 😊", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "mula") || (event.body.toLowerCase() == "mula")) {
     return api.sendMessage("️मेरो घर आउ, धेरै छ जति खान्छौ खाऊ 😋", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "bro") || (event.body.toLowerCase() == "Bro")) {
     return api.sendMessage("️But I Am Girl, You Can Call Me Sammy", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "boy") || (event.body.toLowerCase() == "boy")) {
     return api.sendMessage("️My name is Sammy, I'm Girl 😑", threadID, messageID);
   };
  
   if ((event.body.toLowerCase() == "beb") || (event.body.toLowerCase() == "beb")) {
     return api.sendMessage("️Hajurr Babe😚🖤", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "baby") || (event.body.toLowerCase() == "baby")) {
     return api.sendMessage("️Hajurr Babe😚🖤", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "machikne") || (event.body.toLowerCase() == "machikney")) {
     return api.sendMessage("️त मुजी बा चिकने🥱", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "amit") || (event.body.toLowerCase() == "amit")) {
     return api.sendMessage("️Amit Editz मुजी रन्डीको बान हो 😕", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "bebe") || (event.body.toLowerCase() == "bebe")) {
     return api.sendMessage("Hajurr Babe😚🖤", threadID, messageID);
   };
  
   if ((event.body.toLowerCase() == "oe") || (event.body.toLowerCase() == "oe") || (event.body.toLowerCase() == "oa")) {
     return api.sendMessage("के भयो Humm छिटो भन म BG छु।🙂", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "k gardai xau") || (event.body.toLowerCase() == "k gardai xau")) {
     return api.sendMessage("️Kei Nai, remember you🥺", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "sut") || (event.body.toLowerCase() == "sut")) {
     return api.sendMessage("️Sleep first and tell others to sleep 🥱", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "fight") || (event.body.toLowerCase() == "fyt")) {
     return api.sendMessage("️Sorry, We Are Peace Lover ✌🏻🕊", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "hi") || (event.body.toLowerCase() == "hii") || (event.body.toLowerCase() == "hy")) {
     return api.sendMessage("️Hello, How Are You 😗", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "hora") || (event.body.toLowerCase() == "horw")) {
     return api.sendMessage("️Umm, होनी त 😚", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "hello") || (event.body.toLowerCase() == "heloo")) {
     return api.sendMessage("️Hi And Wassup Preety Stranger🙂", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "who are you") || (event.body.toLowerCase() == "who r u")) {
     return api.sendMessage("️I Am Sammy, An AI Based Messenger Chatbot. IAAm...YearsOld, don't know that girls don't review their true age (눈‸눈) ", threadID, messageID);
   };
  
  if ((event.body.toLowerCase() == "chikne") || (event.body.toLowerCase() == "chikney")) {
     return api.sendMessage("️नाई न चिक्ने🙃", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "Mwah") || (event.body.toLowerCase() == "chuppa") || (event.body.toLowerCase() == "kiss")) {
     return api.sendMessage("️Mwahhhhhhh💋, eat the chuppa baby 🙈", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "abhi") || (event.body.toLowerCase() == "abhi")) {
     return api.sendMessage("️Chimpanda Saley Ho🙄", threadID, messageID);
  
  if (event.body.indexOf("Sammyy") == 0 || (event.body.toLowerCase() == "bot") || (event.body.indexOf("sam") == 0)) {
    var msg = {
      body: ` ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  };
  }
}
};