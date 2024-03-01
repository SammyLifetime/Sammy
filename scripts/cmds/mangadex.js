const axios = require("axios");
const fs = require("fs-extra");

async function searchManga(query) {
  try {
    const response = await axios.get(`https://api.mangadex.org/manga?title=${encodeURIComponent(query)}&limit=5`);
    const mangaList = response.data.data;
    const options = mangaList.map((manga, index) => `${index + 1}. ${manga.attributes.title.en}`);
    return { options, mangaList };
  } catch (error) {
    throw new Error("Failed to search manga on MangaDex API");
  }
}

async function getMangaImages(mangaId) {
  try {
    const chapterResponse = await axios.get(`https://api.mangadex.org/manga/${mangaId}/feed?limit=5`);
    const chapters = chapterResponse.data.data;
    const images = [];
    for (const chapter of chapters) {
      const chapterId = chapter.id;
      const chapterResponse = await axios.get(`https://api.mangadex.org/chapter/${chapterId}`);
      const chapterData = chapterResponse.data.data;
      const chapterImages = chapterData.attributes.data.map((data) => `https://uploads.mangadex.org/data/${chapterData.attributes.hash}/${data}`);
      images.push(...chapterImages);
    }
    return images;
  } catch (error) {
    throw new Error("Failed to fetch manga images from MangaDex API");
  }
}

async function sendMangaImages(message, mangaId) {
  try {
    const images = await getMangaImages(mangaId);

    // Send manga images
    for (const imageUrl of images) {
      const imageResponse = await axios.get(imageUrl, { responseType: "stream" });
      const imagePath = `./tmp/${mangaId}_${Date.now()}.jpg`;
      imageResponse.data.pipe(fs.createWriteStream(imagePath));
      await message.reply({
        body: "Manga Image",
        attachment: fs.createReadStream(imagePath),
      });
      fs.unlinkSync(imagePath);
    }
  } catch (error) {
    await message.reply("An error occurred while fetching manga images.");
    console.error(error);
  }
}

module.exports = {
  config: {
    name: "mangadex",
    version: "1.0",
    author: "Samir Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: "Manga",
    longDescription: {
      vi: "Gửi hình ảnh manga từ MangaDex API",
      en: "Send manga images from MangaDex API",
    },
    category: "media",
    guide: {},
  },

  onStart: async function ({ args, message }) {
    if (args.length < 2) {
      return message.reply("Please provide a manga title to search.");
    }
    const searchQuery = args.slice(1).join(" ");
    try {
      const { options, mangaList } = await searchManga(searchQuery);
      if (mangaList.length === 0) {
        return message.reply(`No manga found for "${searchQuery}".`);
      }
      if (mangaList.length === 1) {
        const mangaId = mangaList[0].id;
        await sendMangaImages(message, mangaId);
      } else {
        const optionsText = options.join("\n");
        await message.reply(`Multiple manga found for "${searchQuery}". Please choose one by replying with the corresponding number:\n\n${optionsText}`);
        // Wait for user's reply
        const userReply = await message.channel.awaitMessages({
          filter: (msg) => msg.author.id === message.author.id,
          max: 1,
          time: 60000, // Timeout in milliseconds (adjust as needed)
          errors: ["time"],
        });

        const chosenOption = parseInt(userReply.first().content.trim());
        await handleUserReply(userReply.first(), mangaList);
      }
    } catch (error) {
      await message.reply("An error occurred while searching for manga.");
      console.error(error);
    }
  },
};

async function handleUserReply(message, mangaList) {
  const chosenOption = parseInt(message.body.trim());
  if (isNaN(chosenOption) || chosenOption <= 0 || chosenOption > mangaList.length) {
    return message.reply("Invalid option. Please choose a valid option number.");
  }
  const mangaId = mangaList[chosenOption - 1].id;
  await sendMangaImages(message, mangaId);
}