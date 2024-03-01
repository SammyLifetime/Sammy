const axios = require('axios');
module.exports = {
  config: {
    name: 'prodia',
    version: '1.0',
    author: 'rehat--',
    countDown: 0,
    role: 0,
    longDescription: {
      en: 'Text to Image'
    },
    category: 'ai',
    guide: {
      en: '1 | Anything\n' +
        '2 | AOM3O3_Orangemixs\n' +
        '3 | Dreamlike-Anime\n' +
        '4 | EimisAnimeDiffusion\n' +
        '5 | Mechamix_V10\n' +
        '6 | Meinamix_MeinaV9\n' +
        '7 | Meinamix_MeinaV11\n' +
        '8 | 3Guofeng3_V34\n' +
        '9 | Absolutereality_V16\n' +
        '10 | Absolutereality_V181\n' +
        '11 | AmIReal_V41\n' +
        '12 | Analog-Diffusion\n' +
        '13 | AnythingV3_Pruned\n' +
        '14 | AnythingV4.5_Pruned\n' +
        '15 | AnythingV5_PrtRE\n' +
        '16 | Aom3a3_Orangemixs\n' +
        '17 | BlazingDrive_V10g\n' +
        '18 | CetusMix_Version35\n' +
        '19 | ChildrensStories_V13D\n' +
        '20 | ChildrensStories_V1SemiReal\n' +
        '21 | ChildrensStories_V1ToonAnime\n' +
        '22 | Counterfeit_V30\n' +
        '23 | CuteyukimixAdorable_Midchapter3\n' +
        '24 | Cyberrealistic_V33\n' +
        '25 | Dalcefo_V4\n' +
        '26 | Deliberate_V2\n' +
        '27 | Deliberate_V3\n' +
        '28 | Dreamlike-Anime\n' +
        '29 | Dreamlike-Diffusion\n' +
        '30 | Dreamlike-Photoreal-V2\n' +
        '31 | Dreamshaper_6BakedVae\n' +
        '32 | Dreamshaper_7\n' +
        '33 | Dreamshaper_8\n' +
        '34 | EdgeOfRealism_EorV20\n' +
        '35 | EimisAnimeDiffusion\n' +
        '36 | Elldreths-Vivid-Mix\n' +
        '37 | Epicrealism_NaturalSinRC1VAE\n' +
        '38 | ICantBelieveItsNotPhotography_Seco\n' +
        '39 | Juggernaut_Aftermath\n' +
        '40 | Lofi_V4\n' +
        '41 | Lyriel_V16\n' +
        '42 | MajicmixRealistic_V4\n' +
        '43 | Mechamix_V10\n' +
        '44 | Meinamix_MeinaV9\n' +
        '45 | Meinamix_MeinaV11\n' +
        '46 | NeverendingDream_V122\n' +
        '47 | Openjourney_V4\n' +
        '48 | PastelMixStylizedAnime_Pruned_Fp16\n' +
        '49 | Portraitplus_V1.0\n' +
        '50 | Protogenx34\n' +
        '51 | Realistic_Vision_V1.4-Pruned-Fp16\n' +
        '52 | Realistic_Vision_V2.0\n' +
        '53 | Realistic_Vision_V4.0\n' +
        '54 | Realistic_Vision_V5.0\n' +
        '55 | Redshift_Diffusion-V10\n' +
        '56 | RevAnimated_V122\n' +
        '57 | RundiffusionFX25D_V10\n' +
        '58 | RundiffusionFX_V10\n' +
        '59 | Sdv1_4\n' +
        '60 | V1-5-Pruned-Emaonly\n' +
        '61 | ShoninsBeautiful_V10\n' +
        '62 | Theallys-Mix-Ii-Churned\n' +
        '63 | Timeless-1.0\n' +
        '64 | Toonyou_Beta6\n' +
        '65 | Analog-Diffusion\n' +
        '66 | AnythingV3_Pruned\n' +
        '67 | AnythingV4.5_Pruned\n' +
        '68 | Aom3a3_Orangemixs\n' +
        '69 | Deliberate_V2\n' +
        '70 | Dreamlike-Diffusion\n' +
        '71 | Dreamlike-Diffusion\n' +
        '72 | Dreamshaper_5BakedVae\n' +
        '73 | Dreamshaper_6BakedVae\n' +
        '74 | Elldreths-Vivid-Mix\n' +
        '75 | Lyriel_V15\n' +
        '76 | Lyriel_V16\n' +
        '77 | Mechamix_V10\n' +
        '78 | Meinamix_MeinaV9\n' +
        '79 | Openjourney_V4\n' +
        '80 | Portrait+1.0\n' +
        '81 | Realistic_Vision_V1.4-Pruned-Fp16\n' +
        '82 | Realistic_Vision_V2.0\n' +
        '83 | RevAnimated_V122\n' +
        '84 | Sdv1_4\n' +
        '85 | V1-5-Pruned-Emaonly\n' +
        '86 | ShoninsBeautiful_V10\n' +
        '87 | Theallys-Mix-Ii-Churned\n' +
        '88 | Timeless-1.0\n'
    }
  },

  onStart: async function ({ message, args, event, api }) {
    try {
      const info = args.join(' ');
      const [prompt, model] = info.split('|').map(item => item.trim());
      const text = args.join (" ");
      if (!text) {
        return message.reply("Add something baka.");
      }
      const modelParam = model || '10';
      const apiUrl = `https://turtle-apis.onrender.com/api/prodia?prompt=${prompt}&model=${modelParam}`;

      await message.reply('Please Wait...⏳');
      const form = {
      };
      form.attachment = [];
      form.attachment[0] = await global.utils.getStreamFromURL(apiUrl);

      message.reply(form);
    } catch (error) {
      console.error(error);
      await message.reply('❌ | Sorry, API Have Skill Issue');
    }
  }
};