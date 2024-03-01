const axios = require("axios");
const search = require("youtube-search");

module.exports = {
  config: {
    name: "Youtube",
    aliases: "yd",
    version: "1.0",
    author: "Samuel Kâñèñgeè/King Monsterwith",
    countDown: 5,
    role: 0,
    shortDescription: "Displays video details",
    longDescription: "This command displays the number of viewers and likes for a video on YouTube",
    category: "Utility",
    guide: {
      en: "{p}{n} [videoID]",
    },
  },

  onStart: async function ({ api, event, args }) {
    if (args.length < 1) {
      api.sendMessage("Please provide a YouTube link or search keyword.", event.threadID);
      return;
    }

    let videoID = "";
    if (args[0].includes("youtube.com")) {
      const urlParams = new URLSearchParams(args[0].split("?")[1]);
      videoID = urlParams.get("v");
    } else {
      const searchOptions = {
        maxResults: 1,
        key: "AIzaSyDTb8PSe2tDi3SCR4d1MyH77C7g0-j847s",
      };
      const searchResults = await search(args[0], searchOptions);
      if (searchResults.length > 0) {
        videoID = searchResults[0].id;
      }
    }

    if (videoID === "") {
      api.sendMessage("No video found for the given YouTube link or search keyword.", event.threadID);
      return;
    }

    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoID}&key=AIzaSyDTb8PSe2tDi3SCR4d1MyH77C7g0-j847s`);
      const { viewCount, likeCount } =response.data.items[0].statistics;

      api.sendMessage(`Video ID: ${videoID}\nViewers: ${viewCount}\nLikes: ${likeCount}`, event.threadID);
    } catch (error) {
      api.sendMessage("An error occurred while fetching video details.", event.threadID);
      console.error(error);
    }
  },
};