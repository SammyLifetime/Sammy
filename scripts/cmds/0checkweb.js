const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  config: {
    name: "checkweb",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "darkgpt",
    longDescription: "darkgpt chat",
    category: "ai",
    guide: "{pn}"
  },

  onStart: async function (o) {
    const send = msg => o.api.sendMessage(msg, o.event.threadID, o.event.messageID);

    axios.get('https://scam.vn/check-website?domain=' + encodeURIComponent(o.args[0])).then(res => {
      const dom = cheerio.load(res.data);
      const div = dom('.container.text-center');
      const date_register = div.find('div:eq(0) > div:eq(0) > h6').text().split(' ').pop();
      const [like, dis_like] = ['#improve_web', '#report_web'].map($ => div.find(`${$} > span`).text());
      const do_tin_cay = div.find('.col-md-12.bg-warning.p-3 > a').text();
      const warn = [0, 1].map($ => div.find('.col-md-6.mt-2').eq($).text().trim());

      send(`╔════ஜ۩۞۩ஜ═══╗\n\n[===[ Check Scam ]===]\n\n- Domain: ${o.args[0]}\n- Register: ${date_register}\n- Evaluate:\n 💖: ${like}\n 💔: ${dis_like}\n- Trust: ${do_tin_cay}\n- Evaluate:\n\n${warn.join('\n\n')}\n\nCode BY King Monsterwith API not Mine\n\n╚════ஜ۩۞۩ஜ═══╝`);
    }).catch(err => send(err.toString()));
  }
};