const axios = require('axios');
const google = require('googlethis');
module.exports = {
  config: {
    name: "ggl",
    aliases:["googlethis"],
    version: "2.0",
    author: "Samir",
    role: 0,
    shortDescription: {
      en: "Searches Google for a given query."
    },
    longDescription: {
      en: "This command searches Google for a given query"
    },
    category: "utility",
    guide: {
      en: "To use this command, type !google <query>."
    }
  },
  onStart: async function ({ api, event, args }) {
    let samirey = args.join(" ");
const options = {
  page: 0, 
  safe: false,
  additional_params: { 
    // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
    hl: 'en' 
  }
}
const response = await google.search(`${samirey}`, options);
var title = res.results.title[0];
var title1 = res.results.title[1];
return api.sendMessage(`${title}\n${title1}`, event.threadID, event.messageID);
  }
};