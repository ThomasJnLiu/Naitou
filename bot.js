const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity("Itou", { type: "WATCHING" })
})

const { token } = require('./config.json');
client.login(token);