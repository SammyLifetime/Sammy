const axios = require("axios");

module.exports = {
  config: {
    name: "video2",
    aliases: ["vid2", "vd2"],
    version: "1.0",
    author: "King Monsterwith",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Get video for a song",
    },
    longDescription: {
      en: "This command allows you to get the lyrics for a song. Usage: ! video <>",
    },
    category: "music",
    guide: {
      en: "{prefix} video <>",
    },
  },

  onStart: async function (bot, message, args, config) {
    if (!args.length){
      return message.channel.send('You need to provide a song name');
    };

    let query = encodeURIComponent(args.join(' '));

    const AIzaSyDBOpnGGz225cPwHlJQs8OMRtxOjSUm73I = config.AIzaSyDBOpnGGz225cPwHlJQs8OMRtxOjSUm73I;
    const limit = 1;

    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${AIzaSyDBOpnGGz225cPwHlJQs8OMRtxOjSUm73I}&maxResults=${limit}`);

    let videoID = response.data.items[0].id.videoId;
    let videoURL = `https://www.youtube.com/watch?v=${videoID}`;

    message.channel.send(videoURL);
  },
};