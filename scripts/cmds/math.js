module.exports = {
  config: {
    name: "math",
    aliases: ["mathematics", "solve"],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "Math solution",
    longDescription: "Mathematics problems solution",
    category: "study",
    guide: {
      en: " {pn} [| |-P|-g|-v|] <mathematical_problems>"
    },
    info: [
      {
        key: 'none',
        prompt: '',
        type: 'Math',
        example: 'math x+1=2'
      },
      {
        key: '-p',
        prompt: 'Original Function',
        type: 'Equation',
        example: 'math -p xdx'
      },
      {
        key: '-p',
        prompt: 'Integral',
        type: 'Equation',
        example: 'math -p xdx from 0 to 2'
      },
      {
        key: '-g',
        prompt: 'Graph',
        type: 'Equation',
        example: 'math -g y = x^3 - 9'
      },
      {
        key: '-v',
        prompt: 'Vector',
        type: 'Vector coordinates',
        example: 'math -v (1, 2, 3) - (5, 6, 7)'
      }
    ],
    envConfig: {
      "WOLFRAM": "T8J8YV-H265UQ762K"
    }
  },
  onStart: async function ({ api, event, args }) {
    const fs = require('fs-extra');
    const axios = require('axios');
    const { threadID, messageID } = event;
    const text = [];
    const key = process.env.WOLFRAM || "T8J8YV-H265UQ762K";
    const content = (event.type === 'message_reply') ? event.messageReply.body : args.join(" ");

    if (!content) {
      return out("Please enter the calculation");
    } else if (content.indexOf("-p") === 0) {
      try {
        content = "primitive " + content.slice(3);
        const { data } = await axios.get(`http://api.wolframalpha.com/v2/query?appid=${key}&input=${encodeURIComponent(content)}&output=json`);
        if (content.includes("from") && content.includes("to")) {
          const value = data.queryresult.pods.find(e => e.id === "Input").subpods[0].plaintext;
          if (value.includes("≈")) {
            const [b, c] = value.split("≈")[0].split(" = ")[1].split(", ");
            return out(`Fractional: ${b}\nDecimal: ${c}`);
          } else {
            return out(value.split(" = ")[1]);
          }
        } else {
          return out((data.queryresult.pods.find(e => e.id === "IndefiniteIntegral").subpods[0].plaintext.split(" = ")[1]).replace("+ constant", ""));
        }
      } catch (e) {
        return out(`${e}`);
      }
    } else if (content.indexOf("-v") === 0) {
      try {
        content = "vector " + content.slice(3).replace(/\(/g, "<").replace(/\)/g, ">");
        const { data } = await axios.get(`http://api.wolframalpha.com/v2/query?appid=${key}&input=${encodeURIComponent(content)}&output=json`);
        const src = data.queryresult.pods.find(e => e.id === "VectorPlot").subpods[0].img.src;
        const vectorLength = data.queryresult.pods.find(e => e.id === "VectorLength").subpods[0].plaintext;
        let result;
        if (data.queryresult.pods.some(e => e.id === "Result")) {
          result = data.queryresult.pods.find(e => e.id === "Result").subpods[0].plaintext;
        }
        const img = (await axios.get(src, { responseType: 'stream' })).data;
        img.pipe(fs.createWriteStream("./graph.png")).on("close", () => {
          api.sendMessage(
            { body: (!result) ? '' : result + "\nVector Length: " + vectorLength, attachment: fs.createReadStream("./graph.png") },
            threadID,
            () => fs.unlinkSync("./graph.png"),
            messageID
          );
        });
      } catch (e) {
        return out(`${e}`);
      }
    } else {
      try {
        const { data } = await axios.get(`http://api.wolframalpha.com/v2/query?appid=${key}&input=${encodeURIComponent(content)}&output=json`);
        if (data.queryresult.pods.some(e => e.id === "Solution")) {
          const value = data.queryresult.pods.find(e => e.id === "Solution");
          for (const e of value.subpods) {
            text.push(e.plaintext);
          }
          return out(text.join("\n"));
        } else if (data.queryresult.pods.some(e => e.id === "ComplexSolution")) {
          const value = data.queryresult.pods.find(e => e.id === "ComplexSolution");
          for (const e of value.subpods) {
            text.push(e.plaintext);
          }
          return out(text.join("\n"));
        } else if (data.queryresult.pods.some(e => e.id === "Result")) {
          return out(data.queryresult.pods.find(e => e.id === "Result").subpods[0].plaintext);
        }
      } catch (error) {
        console.error(error);
        return out("Sorry, I couldn't find any information on that topic.");
      }
    }

    function out(message) {
      api.sendMessage({ body: message }, threadID, messageID);
    }
  }
};
