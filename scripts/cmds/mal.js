const fs = require("fs");
const axios = require("axios");
const Scraper = require('mal-scraper');
const request = require('request');

module.exports = {
	config: {
		name: "mal",
		version: "1.1",
		author: "Samir B. Thakuri",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Search Anime from Myanimelist",
			en: "Search Anime from Myanimelist"
		},
		longDescription: {
			vi: "Search Anime from Myanimelist",
			en: "Search Anime from Myanimelist"
		},
		category: "anime",
		guide: {
			en: "{pn} <name of anime>"
		},
	},

	onStart: async function ({ api, event }) {
		const input = event.body;
		const query = input.substring(5).replace(/ /g, " ");
		api.sendMessage(`🔍𝘀𝗲𝗮𝗿𝗰𝗵𝗶𝗻𝗴 𝗳𝗼𝗿\n【 ${query} 】`, event.threadID, event.messageID);

		const Anime = await Scraper.getInfoFromName(query)
			.catch(err => {
				api.sendMessage("⚠️" + err, event.threadID, event.messageID);
			});

		console.log(Anime);

		const getURL = Anime.picture;
		const ext = getURL.substring(getURL.lastIndexOf(".") + 1);

		if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "None";

		const title = Anime.title;
		const japTitle = Anime.japaneseTitle;
		const type = Anime.type;
		const status = Anime.status;
		const premiered = Anime.premiered;
		const broadcast = Anime.broadcast;
		const aired = Anime.aired;
		const producers = Anime.producers;
		const studios = Anime.studios;
		const source = Anime.source;
		const episodes = Anime.episodes;
		const duration = Anime.duration;
		const genres = Anime.genres.join(", ");
		const popularity = Anime.popularity;
		const ranked = Anime.ranked;
		const score = Anime.score;
		const rating = Anime.rating;
		const synopsis = Anime.synopsis;
		const url = Anime.url;
		const endD = Anime.end_date;

		const callback = function () {
			api.sendMessage({
				body: `Title: ${title}\nJapanese: ${japTitle}\nType: ${type}\nStatus: ${status}\nPremiered: ${premiered}\nBroadcast: ${broadcast}\nAired: ${aired}\nProducers: ${producers}\nStudios: ${studios}\nSource: ${source}\nEpisodes: ${episodes}\nDuration: ${duration}\nGenres: ${genres}\nPopularity: ${popularity}\nRanked: ${ranked}\nScore: ${score}\nRating: ${rating}\n\nSynopsis: \n${synopsis}\nLink: ${url}`,
				attachment: fs.createReadStream(__dirname + `/cache/mal.${ext}`)
			}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/mal.${ext}`), event.messageID);
		}

		request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/mal.${ext}`)).on("close", callback);
	}
};
