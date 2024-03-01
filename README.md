<img src="https://i.ibb.co/RQ28H2p/banner.png" alt="banner">
<h1 align="center"><img src="./dashboard/images/logo-non-bg.png" width="22px"> Goat Bot - Bot Chat Messenger</h1>

<p align="center">
	<a href="https://nodejs.org/dist/v16.20.0">
		<img src="https://img.shields.io/badge/Nodejs%20Support-16.x-brightgreen.svg?style=flat-square" alt="Nodejs Support v16.x">
	</a>
  <img alt="size" src="https://img.shields.io/github/repo-size/ntkhang03/Goat-Bot-V2.svg?style=flat-square&label=size">
  <img alt="code-version" src="https://img.shields.io/badge/dynamic/json?color=brightgreen&label=code%20version&prefix=v&query=%24.version&url=https://github.com/ntkhang03/Goat-Bot-V2/raw/main/package.json&style=flat-square">
  <img alt="visitors" src="https://visitor-badge.laobi.icu/badge?style=flat-square&page_id=ntkhang3.Goat-Bot-V2">
  <img alt="size" src="https://img.shields.io/badge/license-MIT-green?style=flat-square&color=brightgreen">
</p>

- [📝 **Note**](#-note)
- [🚧 **Requirement**](#-requirement)
- [📝 **Tutorial**](#-tutorial)
- [🔔 **How to get notification when have new update?**](#-how-to-get-notification-when-have-new-update)
- [🆙 **How to Update**](#-how-to-update)
- [🛠️ **How to create new commands**](#️-how-to-create-new-commands)
- [💭 **Support**](#-support)
- [📚 **Support Languages in source code**](#-support-languages-in-source-code)
- [📌 **Common Problems**](#-common-problems)
- [❌ **DO NOT USE THE ORIGINAL UNDERGRADUATE VERSION**](#-do-not-use-the-original-undergraduate-version)
- [📸 **Screenshots**](#-screenshots)
- [✨ **Copyright (C)**](#-copyright-c)
- [📜 **License**](#-license)

<hr>

## 📝 **Note**
- This is a messenger chat bot using a personal account, using an [unofficial api](https://github.com/ntkhang03/fb-chat-api/blob/master/DOCS.md) ([Origin here](https://github.com/Schmavery/facebook-chat-api)) and this may lead to facebook account being locked due to spam or other reasons. 
- So, I recommend using a clone account (one that you're willing to throw away at any time)
- ***I am not responsible for any problems that may arise from using this bot.***

## 🚧 **Requirement**
- Node.js 16.x [Download](https://nodejs.org/dist/v16.20.0) | [Home](https://nodejs.org/en/download/) | [Other versions](https://nodejs.org/en/download/releases/)
- Knowledge of **programming**, javascript, nodejs, unofficial facebook api

## 📝 **Tutorial**
Tutorial has been uploaded on YouTube
- For mobile phone: https://www.youtube.com/watch?v=grVeZ76HlgA
- For vps/windows: https://www.youtube.com/watch?v=uCbSYNQNEwY
  
Summary instructions:
- See [here](https://github.com/ntkhang03/Goat-Bot-V2/blob/main/STEP_INSTALL.md)

## 🔔 **How to get notification when have new update?**
- Click on the `Watch` button in the upper right corner of the screen and select `Custom` and select `Pull requests` and `Releases` and click `Apply` to get notified when there is a new update.

## 🆙 **How to Update**
Tutorial has been uploaded on YouTube
- on phone/repl: https://youtu.be/grVeZ76HlgA?t=1342
- on vps/computer: https://youtu.be/uCbSYNQNEwY?t=508

## 🛠️ **How to create new commands**
- See [here](https://github.com/ntkhang03/Goat-Bot-V2/blob/main/DOCS.md)

## 💭 **Support**
If you have major coding issues with this bot, please join and ask for help.
- https://discord.com/invite/DbyGwmkpVY (recommended)
- https://www.facebook.com/groups/goatbot
- https://m.me/j/Abbq0B-nmkGJUl2C
- ~~https://t.me/gatbottt~~ (no longer supported)
- ***Please do not inbox me, I do not respond to private messages, any questions please join the chat group for answers. ThankThanks!***

## 📚 **Support Languages in source code**
- Currently, the bot supports 2 languages:
- [x] `en: English`
- [x] `vi: Vietnamese`

- Change language in `config.json` file
- You can customize the language in the folder `languages/`, `languages/cmds/` and `languages/events/`

## 📌 **Common Problems**
<details>
	<summary>
		📌 Error 400: redirect_uri_mismatch
	</summary>
	<p><img src="https://i.ibb.co/6Fbjd4r/image.png" width="250px"></p> 
	<p>1. Enable Google Drive API: <a href="https://youtu.be/nTIT8OQeRnY?t=347">Tutorial</a></p>
	<p>2. Add uri <a href="https://developers.google.com/oauthplayground">https://developers.google.com/oauthplayground</a> (not <a href="https://developers.google.com/oauthplayground/">https://developers.google.com/oauthplayground/</a>) to <b>Authorized redirect URIs</b> in <b>OAuth consent screen:</b> <a href="https://youtu.be/nTIT8OQeRnY?t=491">Tutorial</a></p>  
	<p>3. Choose <b>https://www.googleapis.com/auth/drive</b> and <b>https://mail.google.com/</b> in <b>OAuth 2.0 Playground</b>: <a href="https://youtu.be/nTIT8OQeRnY?t=600">Tutorial</a></p>
</details>

<details>
	<summary>
		📌 Error for site owners: Invalid domain for site key
	</summary>
		<p><img src="https://i.ibb.co/2gZttY7/image.png" width="250px"></p>
		<p>1. Go to <a href="https://www.google.com/recaptcha/admin">https://www.google.com/recaptcha/admin</a></p>
		<p>2. Add domain <b>repl.co</b> (not <b>repl.com</b>) to <b>Domains</b> in <b>reCAPTCHA v2</b> <a href="https://youtu.be/nTIT8OQeRnY?t=698">Tutorial</a></p>
</details>

<details>
	<summary>
		📌 GaxiosError: invalid_grant, unauthorized_client 
	</summary>
		<p><img src="https://i.ibb.co/n7w9TkH/image.png" width="250px"></p>
		<p><img src="https://i.ibb.co/XFKKY9c/image.png" width="250px"></p>
		<p><img src="https://i.ibb.co/f4mc5Dp/image.png" width="250px"></p>
		<p>- If you don't publish the project in google console, the refresh token will expire after 1 week and you need to get it back. <a href="https://youtu.be/nTIT8OQeRnY?t=445">Tuatorial</a></p>
</details>

<details>
	<summary>
		📌 GaxiosError: invalid_client
	</summary>
		<p><img src="https://i.ibb.co/st3W6v4/Pics-Art-01-01-09-10-49.jpg" width="250px"></p>
		<p>- Check if you have entered your google project client_id correctly <a href="https://youtu.be/nTIT8OQeRnY?t=509">Tuatorial</a></p>
</details>

<details>
	<summary>
		📌 Error 403: access_denied
	</summary>
		<p><img src="https://i.ibb.co/dtrw5x3/image.png" width="250px"></p>
		<p>- If you don't publish the project in google console only the approved accounts added to the project can use it <a href="https://youtu.be/nTIT8OQeRnY?t=438">Tuatorial</a></p>
</details>

## ❌ **DO NOT USE THE ORIGINAL UNDERGRADUATE VERSION**
- The use of unknown source code can lead to the device being infected with viruses, malware, hacked social accounts, banks, ...
- Goat-Bot-V2 is only published at https://github.com/ntkhang03/Goat-Bot-V2, all other sources, all forks from other github, replit,... are fake, violate policy
- If you use from other sources (whether accidentally or intentionally) it means that you are in violation and will be banned without notice
## 📸 **Screenshots**
- ### Bot
<details>
	<summary>
 		Rank system
	</summary>

  - Rank card:
  <p><img src="https://i.ibb.co/d0JDJxF/rank.png" width="399px"></p>

  - Rankup notification:
  <p><img src="https://i.ibb.co/WgZzthH/rankup.png" width="399px"></p>

  - Custom rank card:
  <p><img src="https://i.ibb.co/hLTThLW/customrankcard.png" width="399px"></p>
</details>

<details>
	<summary>
 		Weather
	</summary>
	<p><img src="https://i.ibb.co/2FwWVLv/weather.png" width="399px"></p>
</details>

<details>
	<summary>
 		Auto send notification when have user join or leave box chat (you can custom message)
	</summary>
	<p><img src="https://i.ibb.co/Jsb5Jxf/wcgb.png" width="399px"></p>
</details>

<details>
	<summary>
 		Openjourney
	</summary>
	<p><img src="https://i.ibb.co/XJfwj1X/Screenshot-2023-05-09-22-43-58-630-com-facebook-orca.jpg" width="399px"></p>
</details>

<details>
	<summary>
 		GPT
	</summary>
	<p><img src="https://i.ibb.co/D4wRbM3/Screenshot-2023-05-09-22-47-48-037-com-facebook-orca.jpg" width="399px"></p>
	<p><img src="https://i.ibb.co/z8HqPkH/Screenshot-2023-05-09-22-47-53-737-com-facebook-orca.jpg" width="399px"></p>
	<p><img src="https://i.ibb.co/19mZQpR/Screenshot-2023-05-09-22-48-02-516-com-facebook-orca.jpg" width="399px"></p>
</details>



- ### Dashboard
<details>
	<summary>
 		Home:
	</summary>
	<p><img src="https://i.ibb.co/HV91MbH/image.png" width="399px"></p>
	<p><img src="https://i.ibb.co/DRr97R9/image.png" width="399px"></p>
</details>

<details>
	<summary>
 		Stats:
	</summary>
	<p><img src="https://i.ibb.co/NyCMYxS/image.png" width="399px"></p>
</details>

<details>
	<summary>
 		Login/Register:
	</summary>
	<p><img src="https://i.ibb.co/2Z2L6p4/image.png" width="399px"></p>
	<p><img src="https://i.ibb.co/KF1ftGw/image.png" width="399px"></p>
</details>

<details>
	<summary>
 		Dashboard Thread:
	</summary>
	<p><img src="https://i.ibb.co/tHNqtyy/image.png" width="399px"></p>
</details>

<details>
	<summary>
 		Custom on/off:
	</summary>
	<p><img src="https://i.ibb.co/McDRhmX/image.png" width="399px"></p>
</details>

<details>
	<summary>
 		Custom welcome message (similar with leave, rankup (coming soon), custom command (coming soon))
	</summary>
	<p><img src="https://i.ibb.co/6ZrQqc1/image.png" width="399px"></p>
	<p><img src="https://i.ibb.co/G53JsXm/image.png" width="399px"></p>
</details>

services:
  - type: web
    name: Sammy # Name of the service
    env: docker
    repo: https://github.com/SammyLifetime/Sammy
    plan: free
    branch: main
    envVars:
      - key: PORT
        value: 3000


<p align="center">
  <a href="https://consumet.org/">
    <img alt="Consumet" src="https://consumet.org/images/consumetlogo.png" width="150">
  </a>
</p>

<h1 align="center">
  Consumet API
</h1>
<p align="center">
  Consumet provides an APIs for accessing information and links for various entertainments like movies, books, anime, etc.
</p>
<p align="center">
    <a href="https://github.com/consumet/api.consumet.org/actions/workflows/docker-build.yml">
      <img src="https://github.com/consumet/api.consumet.org/actions/workflows/docker-build.yml/badge.svg" alt="Discord">
    </a>
    <a href="https://github.com/consumet/api.consumet.org/actions/workflows/codeql-analysis.yml">
      <img src="https://github.com/consumet/api.consumet.org/actions/workflows/codeql-analysis.yml/badge.svg" alt="Discord">
    </a>
    <a href="https://discord.gg/qTPfvMxzNH">
      <img src="https://img.shields.io/discord/987492554486452315?color=7289da&label=discord&logo=discord&logoColor=7289da" alt="Discord">
    </a>
    <a href="https://github.com/consumet/api/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/consumet/api" alt="GitHub">
  </a>
</p>

Consumet scrapes data from various websites and provides APIs for accessing the data to satisfy your needs.

<h2> Table of Contents </h2>

- [Installation](#installation)
  - [Locally](#locally)
  - [Docker](#docker)
  - [Heroku](#heroku)
  - [Vercel](#vercel)
  - [Render](#render)
  - [Railway](#railway)
- [Documentation](#documentation)
- [Development](#development)
- [Showcases](#showcases)
- [Provider Request](#provider-request)
- [Support](#support)
- [Contributors ✨](#contributors-)
- [Related repositories](#related-repositories)

## Installation
### Locally
installation is simple.

Run the following command to clone the repository, and install the dependencies.

```sh
$ git clone https://github.com/consumet/api.consumet.org.git
$ cd api.consumet.org
$ npm install #or yarn install
```

start the server!

```sh
$ npm start #or yarn start
```

### Docker
Docker image is available at [Docker Hub](https://hub.docker.com/r/riimuru/consumet-api).

run the following command to pull and run the docker image.

```sh
$ docker pull riimuru/consumet-api
$ docker run -p 3000:3000 riimuru/consumet-api
```
This will start the server on port 3000. You can access the server at http://localhost:3000/, And can change the port by changing the -p option to `-p <port>:3000`.

Be sure to set `NODE_ENV` to `PROD` in your environment variables when running your own instance.
Check out the `.env.example` file for more information.

You can add `-d` flag to run the server in detached mode.

### Heroku
Host your own instance of Consumet API on Heroku using the button below.

[![Deploy on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/consumet/api.consumet.org/tree/main)

### Vercel
Host your own instance of Consumet API on Vercel using the button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fconsumet%2Fapi.consumet.org)

### Render
Host your own instance of Consumet API on Render using the button below.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/consumet/api.consumet.org)

### Railway
Host your own instance of Consumet API on Railway using the button below.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/C0FwuP?referralCode=dv4TuD)

## Documentation
Please refer to the [documentation](https://docs.consumet.org). Join our [Discord server](https://discord.gg/qTPfvMxzNH) if you need any additional help or have any questions, comments, or suggestions.

## Development
Pull requests and stars are always welcome, for bugs and features create a new [issue](https://github.com/consumet/api.consumet.org/issues). If you're brave to make make a commit to the project see [CONTRIBUTING.md](https://github.com/consumet/consumet.ts/blob/master/docs/guides/contributing.md).

## Showcases
Showcases are welcome! If you have a project that uses Consumet API, please let us know by making a new discussion [here](https://github.com/consumet/api.consumet.org/discussions/categories/show-and-tell) or by joining our [Discord server](https://discord.gg/qTPfvMxzNH). We will add your project to our [showcases page](https://consumet.org/showcase).

## Provider Request
Make a new [issue](https://github.com/consumet/consumet.ts/issues/new?assignees=&labels=provider+request&template=provider-request.yml) with the name of the provider on the title, as well as a link to the provider in the body paragraph.

## Support
You can contact the maintainers of consumet.ts via [email](mailto:consumet.org@gmail.com), or [join the discord server](https://discord.gg/qTPfvMxzNH) (Recommended).

<a href="https://discord.gg/qTPfvMxzNH">
   <img src="https://discordapp.com/api/guilds/987492554486452315/widget.png?style=banner2"/>
</a>


## Contributors ✨
Thanks to the following people for keeping this project alive and thriving.

[![](https://contrib.rocks/image?repo=consumet/consumet.ts)](https://github.com/consumet/consumet.ts/graphs/contributors)

## Related repositories
 - [Consumet.ts](https://github.com/consumet/consumet.ts)
 - [Website](https://github.com/consumet/consumet.org)
 - [Providers Status](https://github.com/consumet/providers-status)
 

## ✨ **Copyright (C)**
- **[NTKhang (NTKhang03)](https://github.com/ntkhang03)**

## 📜 **License**

**VIETNAMESE**

- ***Nếu bạn vi phạm bất kỳ quy tắc nào, bạn sẽ bị cấm sử dụng dự án của tôi***
- Không bán mã nguồn của tôi
- Không tự xưng là chủ sở hữu của mã nguồn của tôi
- Không kiếm tiền từ mã nguồn của tôi (chẳng hạn như: mua bán lệnh, mua bán/cho thuê bot, kêu gọi quyên góp, v.v.)
- Không xóa/sửa đổi credit (tên tác giả) trong mã nguồn của tôi

**ENGLISH**

- ***If you violate any rules, you will be banned from using my project***
- Don't sell my source code
- Don't claim my source code as your own
- Do not monetize my source code (such as: buy and sell commands, buy and sell bots, call for donations, etc.)
- Don't remove/edit my credits (author name) in my source code

