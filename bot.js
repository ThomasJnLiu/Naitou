const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity("Itou", { type: "WATCHING" });
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage);
    }
})

function processCommand(receivedMessage) {
    return;
}


const { token } = require('./config.json');
client.login(token);