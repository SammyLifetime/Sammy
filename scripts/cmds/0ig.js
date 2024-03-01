const axios = require('axios');

module.exports = {
  config: {
    name: "ig",
    aliases: ["gen"],
    version: "1.1",
    author: "Tahsan",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "Text to image"
    },
    category: "image",
    guide: {
      en: 'Type -imagine or -t2i with your prompts | (number which model do you want)\Here are the Supported models:\1. Analog-diffusion-1.0\2. Anythingv3_0\3. Anything-v4.5\4. Anything-V5\5. AOM3A3_Orangemix\6. Deliberate_v2\7. Dreamlike-diffusion-1.0\8. Dreamlike-diffusion-2.0\9. Dreamshaper_5BakedVae\10. Dreamshaper_6BakedVae\11. Dreamshaper_7\12. Elldreths-vivid-mix\13. Lyriel_v15\14. Lyriel_v16\15. Mechamix_v10\16. Meinamix_meinaV9\17. Openjourney_V4\18. Portrait+1.0\19. PortraitPlus_V1.0\20. Realistic_Vision_V1.4\21. Realistic_Vision_V2.0\22. Realistic_Vision_V4.0\23. RevAnimated_v122\24. Riffusion-Model-V1\25. Sdv1_4\26. V1-5\27. ShoninsBeautiful_v10\28. Theallys-mix-ii\29. Timeless-1.0\30. EimisAnimeDiffusion_V1.0\31. Meinamix_v11'
    }
  },

  onStart: async function ({ message, args }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("Please provide a prompt.");
    }

    let prompt, model;
    if (text.includes("-")) {
      const [promptText, modelText] = text.split("-").map((str) => str.trim());
      prompt = promptText;
      model = modelText;
    } else {
      prompt = text;
      model = "23";  
    }

    let id; 

    message.reply("✅| Creating your Imagination...").then((info) => {
      id = info.messageID;  
    });

    try {
      const API = `https://gen.blackxlegend1.repl.co/imagine?model=${model}&prompt=${encodeURIComponent(prompt)}&apikey=jarif_loves_senorita`;
      const imageStream = await global.utils.getStreamFromURL(API);
//http://gen.blackxlegend1.repl.co/imagine?model=23&prompt=${encodeURIComponent(prompt)}&apikey=vortex_bitch
      return message.reply({
        attachment: imageStream
      });
    } catch (error) {
      console.log(error);
      message.reply("Failed to generate your imagination.").then(() => {
        message.delete(id);
      });
    }
  }
};