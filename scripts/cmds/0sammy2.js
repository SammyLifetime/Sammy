const axios = require('axios');

let lastQuery = "";

module.exports = {
	config: {
		name: "sammy2",
    aliases: ["sæmmy2"],
		version: "1.0",
		author: "Samuel Kâñèñgeè",
		countDown: 5,
		role: 0,
		shortDescription: "",
		longDescription: "",
		category: "ai",
		guide: "{pn}"
	},
	onStart: async function({ api, event, args }) {
		const { threadID, messageID } = event;

		if (!args[0]) {
			api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\n😿 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗆𝖾 𝖺 (𝖰𝗎𝖾𝗋𝗒) 𝗍𝗈 𝗌𝖾𝖺𝗋𝖼𝗁 𝗈𝗇 𝖯𝗁𝗒𝗍𝗈𝗇 𝖠𝖨...\n\n╚════ஜ۩۞۩ஜ═══╝", threadID, messageID);
			return;
		}

		const query = args.join(" ");

		if (query === lastQuery) {
			api.sendMessage("", threadID, messageID);
			return;
		} else {
			lastQuery = query;
		}

		api.sendMessage("", threadID, messageID);

		try {
			const response = await axios.get(`https://usefull-apis-by-faheem.replit.app/ai?ask=${encodeURIComponent(query)}`);

			if (response.status === 200 && response.data && response.data.message) {
				const answer = response.data.message;
				const formattedAnswer =formatFont(answer); // Apply font formatting
				api.sendMessage(formattedAnswer, threadID, messageID);
			} else {
				api.sendMessage("😿 𝖲𝗈𝗋𝗋𝗒, 𝖭𝗈 𝗋𝖾𝗅𝖾𝗏𝖺𝗇𝗍 𝖺𝗇𝗌𝗐𝖾𝗋𝗌 𝖿𝗈𝗎𝗇𝖽..", threadID, messageID);
			}
		} catch (error) {
			console.error(error);
			api.sendMessage("😿 𝖴𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖤𝗋𝗋𝗈𝗋, 𝖶𝗁𝗂𝗅𝖾 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖺𝗇𝗌𝗐𝖾𝗋 𝗈𝗇 𝖯𝗁𝗒𝗍𝗈𝗇 𝖠𝖨...", threadID, messageID);
			return;
		}
	}
};

function formatFont(text) {
	const fontMapping = {
		
a:"ᴀ",
b:"ʙ",
c:"ᴄ",
d:"ᴅ",
e:"ᴇ",
f:"ғ",
g:"ɢ",
h:"ʜ",
i:"ɪ",
j:"ᴊ",
k:"ᴋ",
l:"ʟ",
m:"ᴍ",
n:"ɴ",
o:"ᴏ",
p:"ᴘ",
q:"ǫ",
r:"ʀ",
s:"s",
t:"ᴛ",
u:"ᴜ",
v:"ᴠ",
w:"ᴡ",
x:"x",
y:"ʏ",
z:"ᴢ",
A:"ᴀ",
B:"ʙ",
C:"ᴄ",
D:"ᴅ",
E:"ᴇ",
F:"ғ",
G:"ɢ",
H:"ʜ",
I:"ɪ",
J:"ᴊ",
K:"ᴋ",
L:"ʟ",
M:"ᴍ",
N:"ɴ",
O:"ᴏ",
P:"ᴘ",
Q:"ǫ",
R:"ʀ",
S:"s",
T:"ᴛ",
U:"ᴜ",
V:"ᴠ",
W:"ᴡ",
X:"x",
Y:"ʏ",
Z:"ᴢ",  
ᴀ:"ᴀ",
ʙ:"ʙ",
ᴄ:"ᴄ",
ᴅ:"ᴅ",
ᴇ:"ᴇ",
ғ:"ғ",
ɢ:"ɢ",
ʜ:"ʜ",
ɪ:"ɪ",
ᴊ:"ᴊ",
ᴋ:"ᴋ",
ʟ:"ʟ",
ᴍ:"ᴍ",
ɴ:"ɴ",
ᴏ:"ᴏ",
ᴘ:"ᴘ",
ǫ:"ǫ",
ʀ:"ʀ",
s:"s",
ᴛ:"ᴛ",
ᴜ:"ᴜ",
ᴠ:"ᴠ",
ᴡ:"ᴡ",
x:"x",
ʏ:"ʏ",
ᴢ:"ᴢ"
    
  };

	let formattedText = "";
	for (const char of text) {
		if (char in fontMapping) {
			formattedText += fontMapping[char];
		} else {
			formattedText += char;
		}
	}
	return formattedText;
          }