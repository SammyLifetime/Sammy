module.exports = {
	config: {
		name: "meme",
		aliases: ["memdom"],
		version: "1.0",
		author: "langit/loufi😈🔪",
		countDown: 4,
		role: 0,
		shortDescription: "meme random ind/en",
		longDescription: "meme random",
		category: "fun",
		guide: "{pn}"
	},
	onStart: async function ({ message }) {
	 var link = ["https://i.imgur.com/E7GfkzU.jpg",
"https://i.imgur.com/0zuGdjk.jpg",
"https://i.imgur.com/uwehgdh.jpg",
"https://i.imgur.com/yYhzYfz.jpg",
"https://i.imgur.com/oRhNqvV.jpg",
"https://i.imgur.com/YwUrZYQ.jpg",
"https://i.imgur.com/XbaXxSH.jpg",
"https://i.imgur.com/izV8Lnx.jpg",
"https://i.imgur.com/bwLrXis.jpg",
"https://i.imgur.com/f7GmyoR.jpg",
"https://i.imgur.com/w1Wptqo.jpg",
"https://i.imgur.com/RNA1b32.jpg",
"https://i.imgur.com/Jyp5mRo.jpg",
"https://i.imgur.com/bKmJcBR.jpg",
"https://i.imgur.com/mTkzvxt.jpg",
"https://i.imgur.com/ummilST.jpg",
"https://i.imgur.com/IYGDZGv.jpg",
"https://i.imgur.com/iswHN60.jpg",
"https://i.imgur.com/V1pkwvV.jpg",
"https://i.imgur.com/ewrbve9.jpg",
"https://i.imgur.com/YkYxku4.jpg",
"https://i.imgur.com/oRxCadp.jpg",
"https://i.imgur.com/1TeQ2aY.jpg",
"https://i.imgur.com/OKDgzrq.jpg",
"https://i.imgur.com/GnVI1QP.jpg",
"https://i.imgur.com/ub8CA4I.jpg",
"https://i.imgur.com/LsXur9C.jpg",
"https://i.imgur.com/PaoMwXe.jpg",
"https://i.imgur.com/SYCVYZe.jpg",
"https://i.imgur.com/iw1InH4.jpg",
"https://i.imgur.com/OB2rzYQ.jpg",
"https://i.imgur.com/e6AwOES.jpg",
"https://i.imgur.com/2momUEr.jpg",
"https://i.imgur.com/cU35zQo.jpg",
"https://i.imgur.com/mjYSPla.jpg",
]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
body: 'here your memes🎭',attachment: await global.utils.getStreamFromURL(img)
})
}
}