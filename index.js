/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const {token} = require('./config.json');
const {Client, Intents} = require('discord.js'); // import discord.js
const fetch = require('node-fetch');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({intents: myIntents}); // create new client
const prefix = '!';

client.on('ready', (ready) => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  processMessage(command, message);
});

// make sure this line is the last line
client.login(token); // login bot using token


async function processMessage(command, message) {
  let price;
  let time = Date();
  switch (command) {
    case 'ping':
      console.log(`Ping Pong. Time => ${time}`);
      message.reply('Pong!');
      break;
    case 'fantom':
      price = await getCoinPrice('fantom');
      time = Date();
      console.log(`Fantom is $${price} right now. Time => ${time}`);
      message.reply(`Fantom is $${price} right now.`);
      break;
    case 'ethereum':
      price = await getCoinPrice('ethereum');
      time = Date();
      console.log(`Ethereum is $${price} right now. Time => ${time}`);
      message.reply(`Ethereum is $${price} right now.`);
      break;
    case 'ftm':
      price = await getCoinPrice('fantom');
      time = Date();
      console.log(`Fantom is $${price} right now. Time => ${time}`);
      message.reply(`Fantom is $${price} right now.`);
      break;
    case 'eth':
      price = await getCoinPrice('ethereum');
      time = Date();
      console.log(`Ethereum is $${price} right now. Time => ${time}`);
      message.reply(`Ethereum is $${price} right now.`);
      break;
  }
}

async function getCoinPrice(coin) {
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
  const body = await response.json();
  const price = body[coin].usd.toFixed(2);
  return price;
}
