module.exports = {
 config: {
 name: "rpg",
 version: "1.0",
 author: "Jeck Olenter",
 countdown: 20,
 role: 0,
 shortDescription: {
 },
 longDescription: {
 en: "Embark on an RPG adventure!"
 },
 category: "game",
 guide: {
 en: "{p}rpg"
 }
 },
 
 data: {
 playerStats: {} 
 },

 onStart: async function ({ event, message, args }) {
 const playerName = args[0] || "Player";
 let balance = 0;
 const healthPlayer = 100;
 const attackPlayer = 20;
 
 const player = {
 name: playerName,
 health: healthPlayer,
 attack: attackPlayer,
 };

 const enemies = [
 {
 name: "Dragon",
 health: 500,
 attack: 500,
 reward: 500
 },
 {
 name: "Goblin",
 health: 400,
 attack: 105,
 reward: 300 
 },
 {
 name: "Skeleton",
 health: 320,
 attack: 205,
 reward: 400
 }
 ];

 
 const playerStats = this.data.playerStats[playerName] || { wins: 0, losses: 0 };

 message.reply(`Welcome, ${player.name}! You have ${playerStats.wins} wins and ${playerStats.losses} losses. Get ready to fight!`);

 let defeatedEnemies = 0;

 while (player.health > 0 && defeatedEnemies < enemies.length) {
 

 if (player.health <= 0) {
 message.reply(`Oh no! ${player.name} has been defeated. Game Over!`);
 playerStats.losses++; 
 break;
 }
 }

 if (defeatedEnemies === enemies.length) {
 

 this.data.playerStats[playerName] = { wins: playerStats.wins + 1, losses: playerStats.losses };

 message.reply(`You have defeated all enemies! ${player.name} wins and earns ${balance} balance!`);
 message.reply(`You now have ${this.data.playerStats[playerName].wins} wins and ${this.data.playerStats[playerName].losses} losses.`);

 
 message.reply(`After upgrades, your current balance is ${balance}. Let's continue the adventure!`);
 }
 }
};