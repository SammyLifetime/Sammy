const axios = require("axios");

module.exports = {
config: {
		name: "mail",
    version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 2,
		shortDescription: "just get mail at 10mm",
		longDescription: "just get mail at 10mm",
		category: "owner",
		guide: {
      en: "{p}{n}",
    }
	},

 onStart: async function ({ api, event, args }) {
   if (args[0] == "new") {
		const res = await axios.get(`https://10minutemail.net/address.api.php?new=1`);
	var user = res.data.mail_get_user;
	var host = res.data.mail_get_host;
	var time = res.data.mail_get_time;
	var stime = res.data.mail_server_time;
	var kmail = res.data.mail_get_key;
	var ltime = res.data.mail_left_time;
	var mid = res.data.mail_list[0].mail_id;
var sub = res.data.mail_list[0].subject;
var date = res.data.mail_list[0].datetime2;
	return api.sendMessage(`»Name mail: ${user}\n»host: ${host}\n»mail ${user}@${host} (.)com\n»time: ${time}\n»time at server: ${stime}\n»key: ${kmail}\n»Time remaining: ${ltime}s\n»mail id: ${mid}\n»content ${sub}\n»date: ${date}`, event.threadID, event.messageID)
}
else if (args[0] == "list") {
		const res = await axios.get(`https://www.phamvandienofficial.xyz/mail10p/domain`);
	var list = res.data.domain
	return api.sendMessage(`list domain: \n${list}`, event.threadID, event.messageID)
}
else if (args[0] == "more") {
 const res = await axios.get(`https://10minutemail.net/address.api.php?more=1`);
	var user = res.data.mail_get_user;
	var host = res.data.mail_get_host;
	var time = res.data.mail_get_time;
	var stime = res.data.mail_server_time;
	var kmail = res.data.mail_get_key;
	var ltime = res.data.mail_left_time;
	var mid = res.data.mail_list[0].mail_id;
var sub = res.data.mail_list[0].subject;
var date = res.data.mail_list[0].datetime2;
	return api.sendMessage(`»Name mail: ${user}\n»host: ${host}\n»mail ${user}@${host} (.)com\n»time: ${time}\n»time at server: ${stime}\n»key: ${kmail}\n»Time remaining: ${ltime}s\n»mail id: ${mid}\n»content ${sub}\n»date: ${date}`, event.threadID, event.messageID)
}
else if (args[0] == "get") {
	 var get = await  axios.get(`https://10minutemail.net/address.api.php`)
      var data = get.data
      var mail = data.mail_get_mail,
        id = data.session_id,
        url = data.permalink.url,
        key_mail = data.permalink.key
      let urlMail = url.replace(/\./g,' . ')
      let maill = mail.replace(/\./g,' . ')
      return api.sendMessage(`» Email: ${maill}\n» ID Mail: ${id}\n» Url Mail: ${urlMail}\n» Key Mail: ${key_mail}`, event.threadID, event.messageID)}
else if (args[0] == "check") {
	var get = await  axios.get(`https://10minutemail.net/address.api.php`)
      var data = get.data.mail_list[0]
      var email = get.data.mail_get_mail
      var id = data.mail_id,
        from = data.from,
        subject = data.subject,
        time = data.datetime2
      let formMail = from.replace(/\./g,' . ')
      let maill = email.replace(/\./g,' . ')
      return api.sendMessage(`» Email: ${maill}\n» ID Mail: ${id}\n» From: ${formMail}\n» Title: ${subject}\n» ${time}`, event.threadID, event.messageID)}
else if (args.join() == "") { 
	  return api.sendMessage(`NEW - Create a new email \n
CHECK - Check your inbox \n
GET - Get current email \n
-------------------------\n\n
You can click on the mail url and enter the Mail Key to see the mail content. `, event.threadID, event.messageID)} 
 }
};