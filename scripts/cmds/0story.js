const axios = require('axios');

module.exports = {
	config: {
		name: "story",
		version: "1.0",
		author: "Samuel Kâñèñgeè",
		countDown: 5,
		role: 0,
		shortDescription: "",
		longDescription: "",
		category: "novel",
		guide: "{pn}"
	},
onStart: async function() {
		try {
			const response = await axios.get('https://story-api.sammyneverdie.repl.co/chapters');
			const chapters = response.data;
			
			// Get the requested chapter from the command arguments
			const requestedChapter = args[0];
			
			// Find the chapter in the list of chapters
			const chapter = chapters.find(chapter => chapter.number === requestedChapter);
			
			if (chapter) {
				// Print the chapter's message
				console.log(chapter.message);
			} else {
				console.log("Chapter not found");
			}
		} catch (error) {
			console.log("Error retrieving chapters");
		}
	}
}