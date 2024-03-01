const axios = require("axios")



module.exports = {
	config: {
		name: "sauce",
		version: "1.1",
		author: "NIB",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: ""
		},
		longDescription: {
			vi: "",
			en: ""
		},
		category: "",
		guide: "",
		
	},

onStart: async function ({ event, message, getLang, usersData, api, args}) {

if( event.type == "message_reply" && event.messageReply.attachments[0] && event.messageReply.attachments[0].type === 'audio'){

var data = {
    'api_token': '3453e4030b998f0cd870a92f548e4079',
    'url': event.messageReply.attachments[0].url,
    'return': 'apple_music,spotify',
};

axios({
    method: 'post',
    url: 'https://api.audd.io/',
    data: data,
    headers: { 'Content-Type': 'multipart/form-data' },
})
.then((response) => {
    console.log(response.data);
  message.reply("Name: " + response.data.result.title + "\nArtist: " + response.data.result.artist + "\nAlbum: " + response.data.result.album + "\nSong link: " + `https://song.link/s${response.data.result.spotify.external_urls.spotify.slice(30)}`)
})
.catch((error) =>  {
message.reply("not found")
    console.log(error);
});
} else{
message.reply("Only reply to audios")
			}
		}
		
}