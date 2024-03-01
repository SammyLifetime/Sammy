const axios = require("axios");

module.exports = {
  config: {
    name: "💝",
    aliases:["love"],
    version: "1.0",
    author: "Samuel Kâñèñgeè/King Monsterwith",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "",
    guide: {
      en: "{p}{n}",
    }
  },

  onStart: async function ({ api, event, args, Users }) {
    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nIf you want to say who you acknowledge, you have to mention 1 person by @tagging\n\n╚════ஜ۩۞۩ஜ═══╝", event.threadID);
    let name = event.mentions[mention];
    var arraytag = [];
    arraytag.push({ id: mention, tag: name });
    var a = function (msg) { api.sendMessage(msg, event.threadID); }
    a("My love for you is boundless, A flame that burns so bright, It shines through all life's ups and downs, A never-ending light.");
    setTimeout(() => { a({ body: "I love you more than words can say, More than the stars above, More than the oceans and the skies, More than life itself, my love.💝" + " " + name, mentions: arraytag }) }, 3000);
    setTimeout(() => { a({ body: "rarely seen people like you 😍.." + " " + name, mentions: arraytag }) }, 5000);
    setTimeout(() => { a({ body: "never get upset 🐰" + " " + name, mentions: arraytag }) }, 7000);
    setTimeout(() => { a({ body: "Forget someone who doesn't want to understand you 💔!" + " " + name, mentions: arraytag }) }, 9000);
    setTimeout(() => { a({ body: "You are the center of my world, The one who makes me whole, I cherish every moment we share, And the love that fills my soul.!" + " " + name, mentions: arraytag }) }, 12000);
    setTimeout(() => { a({ body: "depression Give it my heart 😏 " + " " + name, mentions: arraytag }) }, 15000);
    setTimeout(() => { a({ body: "let's make your ex jealous 🫵😝 🙄😒🔪" + " " + name, mentions: arraytag }) }, 17000);
    setTimeout(() => { a({ body: "No matter where this life may lead, Or what fate has in store, Know that my love will always be, Forever and evermore. So hear me now, my love so dear, And know that it is true, I love you more than life itself, And I will always do." + " " + name, mentions: arraytag }) }, 20000);
    setTimeout(() => { a({ body: "*puts one knee on the ground and grabs your hand * 🤝" + " " + name, mentions: arraytag }) }, 23000);
    setTimeout(() => { a({ body: "take care of yourself stay healthy 💉।" + " " + name, mentions: arraytag }) }, 25000);
    setTimeout(() => { a({ body: " Shall I compare thee to a summer's day? Thou art more lovely and more temperate: Rough winds do shake the darling buds of May, And summer's lease hath all too short a date: Sometime too hot the eye of heaven shines, And often is his gold complexion dimm'd; And every fair from fair sometime declines, By chance or nature's changing course untrimm'd But thy eternal summer shall not fade, Nor lose possession of that fair thou owest; Nor shall Death brag thou wander'st in his shade, When in eternal lines to time thou growest: So long as men can breathe or eyes can see, So long lives this, and this gives life to thee. This sonnet by William Shakespeare is a beautiful way to propose love expressing the idea that the love being offered will last forever, even beyond death. always remember that I love you 😘। so refrain from giving up the illusion of the world 👊" + " " + name, mentions: arraytag }) }, 28500);
    setTimeout(() => { a({ body: "There I said it all while am awake " + " " + name, mentions: arraytag }) }, 36000);
    setTimeout(() => { a("I love youuuuuuu💝💝") }, 39000);
    setTimeout(() => { a("be happy friend") }, 42000);
  }
}; 