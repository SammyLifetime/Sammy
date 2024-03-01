module.exports = {
  config: {
    name: "girl",
    aliases: ["girls"],
    version: "1.0",
    author: "Samir B. Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: "send you random girls pic",
    longDescription: "send you random girls pic",
    category: "image",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
    const porn = [
      "https://api.zahwazein.xyz/randomasupan/justina?apikey=zenzkey_92d341a7630e",
      "https://api.zahwazein.xyz/randomasupan/rose?apikey=zenzkey_92d341a7630e",
      "https://api.zahwazein.xyz/randomasupan/china?apikey=zenzkey_92d341a7630e",
      "https://api.zahwazein.xyz/randomasupan/vietnam?apikey=zenzkey_92d341a7630e",
      "https://api.zahwazein.xyz/randomasupan/ryujin?apikey=zenzkey_92d341a7630e",
      "https://api.zahwazein.xyz/randomasupan/cecan?apikey=zenzkey_92d341a7630e",
      "https://api.zahwazein.xyz/randomasupan/kayes?apikey=zenzkey_92d341a7630e",
      "https://api.zahwazein.xyz/randomasupan/kpop?apikey=zenzkey_92d341a7630e",
      "https://api.zahwazein.xyz/randomasupan/notnot?apikey=zenzkey_92d341a7630e",
      "https://api.zahwazein.xyz/randomasupan/thailand?apikey=zenzkey_92d341a7630e"
    ];

    const img = porn[Math.floor(Math.random() * porn.length)];

    message.send({
      body: 'Samir\'s Hot ex',
      attachment: await global.utils.getStreamFromURL(img)
    });
  }
};
