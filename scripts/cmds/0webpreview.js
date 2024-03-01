module.exports = {
  config: {
    name: "webpreview",
    aliases: ['webview'],
    version: "1.1",
    author: "Samir Thakuri",
    coolDown: 5,
    role: 0,
    shortDescription: "See Website Info",
    longDescription: "Generate a detailed preview of a website's content",
    category: "Utility",
    guide: {
      en: "{pn} [URL]"
    },
  },
  onStart: async function ({ api, event, args }) {
  const url = args[0];

  if (!url) {
    api.sendMessage("Please provide a URL.", event.threadID, event.messageID);
    return;
  }

  api.sendMessage(`🔍 Fetching preview for "${url}"...`, event.threadID, event.messageID);

  try {
    const preview = await generateWebPreview(url);
    if (preview) {
      api.sendMessage({
        body: preview.text,
        attachment: fs.createReadStream(__dirname + "/cache/web_preview_image.jpg")
      }, event.threadID);
      
      if (preview.alternativeResults) {
        api.sendMessage(preview.alternativeResults, event.threadID);
      }
    } else {
      api.sendMessage("No information available for this URL.", event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while generating the preview.", event.threadID, event.messageID);
  }
  
  async function generateWebPreview(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $("head title").text();
    const description = $("meta[name='description']").attr("content") || "";
    const imageUrl = $("meta[property='og:image']").attr("content") || "";

    const previewText = `
🌐 Preview for "${title}":

📜 Description: ${description}
🔗 URL: ${url}
🖼️ Image URL: ${imageUrl}
`;

    const apiResponse = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(title)}`);
    const pages = apiResponse.data.query.pages;
    const pageId = Object.keys(pages)[0];
    const pageData = pages[pageId];
    const extract = pageData.extract || "";

    let alternativeResults = "";

    if (extract) {
      const paragraphs = extract.split("\n\n").filter(para => para.length > 0);
      for (const paragraph of paragraphs) {
        alternativeResults += `\n\n${paragraph}\n\n`;
      }
    }

    let path = __dirname + "/cache/web_preview_image.jpg";
    let hasError = false;

    try {
      let imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(path, Buffer.from(imageResponse.data, "binary"));
    } catch (error) {
      console.log(error);
      hasError = true;
    }

    if (!hasError) {
      return {
        text: previewText,
        alternativeResults: alternativeResults
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
    }
  }
      }