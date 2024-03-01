const deepai = require('deepai');



module.exports = {
	config: {
		name: "img",
		version: "1.1",
		author: "xemon",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "Image Generation"
		},
		longDescription: {
			vi: "",
			en: "Image Generation AI Of Deepai Which Generates Images With Your Prompt"
		},
		category: "image",
		guide: "{pn} <prompt>",
		
	},

onStart: async function ({ event, message, getLang, usersData, api, args}) {
if(!args[0]) return message.reply("Input something baka")

try{
   // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');


    var resp = await deepai.callStandardApi("text2img", {
            text: args.join(" "),
    });

  message.reply({attachment:await global.utils.getStreamFromURL(resp["output_url"])})

}catch(e){
console.log(e)
message.reply("Server busy🥹")
}


}
}