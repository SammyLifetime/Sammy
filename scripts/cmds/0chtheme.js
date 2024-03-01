const axios = require('axios');

module.exports = {
	config: {
		name: "chtheme",
		version: "1.0",
		author: "Samuel Kâñèñgeè",
		countDown: 5,
		role: 0,
		shortDescription: "",
		longDescription: "",
		category: "gc",
		guide: "{pn}"
	},
	onStart: async function({api, event, args}) {
		const color_obj = {
			"default": "196241301102133",
			"hotpink": "169463077092846",
			"aquablue": "2442142322678320",
			"brightpurple": "234137870477637",
			"coralpink": "980963458735625",
			"orange": "175615189761153",
			"green": "2136751179887052",
			"lavenderpurple": "2058653964378557",
			"red": "2129984390566328",
			"yellow": "174636906462322",
			"tealblue": "1928399724138152",
			"aqua": "417639218648241",
			"mango": "930060997172551",
			"berry": "164535220883264",
			"citrus": "370940413392601"
		}

		const response = args.join(" ");
		const { threadID } = event;

		let colorname;
		for (let color in color_obj) {
			if (color === response) {
				colorname = color_obj[color];
			}
		}

		if (colorname !== undefined) {
			api.changeThreadColor(colorname, threadID, (err) => {
				if (err) {
					console.error(err);return console.error(err);
				}
			});
		}
	}
}