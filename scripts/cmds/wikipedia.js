const wiki = require('wikijs').default;

module.exports = {
  config: {
    name: "wiki",
    aliases: ['wikipedia'],
    author: "Samir",
    version: "1.0",
    shortDescription: "Get information from Wikipedia using its API",
    longDescription: "Search for information on a topic using the Wikipedia API and return a summary or full page content.",
    category: "utility",
    guide: {
      vi: "",
      en: ""
    }
  },

  langs: {
    vi: {
      missingInput: "Nhập những gì bạn cần tìm kiếm.",
      returnNotFound: "Không thể tìm thấy %1"
    },
    en: {
      missingInput: "Enter what you need to search for.",
      returnNotFound: "Can't find %1"
    }
  },

  onStart: async function({ args, event, api, getLang }) {
    let content = args.join(" ");
    let url = 'https://en.wikipedia.org/w/api.php';
    if (args[0] == "ne") {
        url = 'https://ne.wikipedia.org/w/api.php'; 
        content = args.slice(1, args.length);
    }
    if (!content) return api.sendMessage(getLangs("missingInput"), event.threadID, event.messageID);
    return wiki({ apiUrl: url })
      .page(content)
      .catch(() => api.sendMessage(getLangs("returnNotFound", content), event.threadID, event.messageID))
      .then(page => (typeof page != 'undefined') ? Promise.resolve(page.summary()).then(val => api.sendMessage(val, event.threadID, event.messageID)) : '');
  }
}
