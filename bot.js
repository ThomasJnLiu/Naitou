const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity("Itou", { type: "WATCHING" });
    console.log("Logged on");
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
    var fullCommand = receivedMessage.content.substring(1);
    var splitCommand = fullCommand.split(" ");
    var primaryCommand = splitCommand[0];
    var arguments = splitCommand.slice(1);

    console.log("Command received: " + primaryCommand);
    console.log("Arguments: " + arguments);
    console.log(Math.floor(Math.random() * 21));

    switch (primaryCommand) {
        case "8ball":
            if (arguments == "") {
                receivedMessage.channel.send("No question received.");
            }
            else {
                switch (randomNum(0, 18)) {
                    case 0:
                        console.log("case 0");
                        receivedMessage.channel.send("It is certain.");
                        break;
                    case 1:
                        console.log("case 1");
                        receivedMessage.channel.send("It is decidedly so.");
                        break;
                    case 2:
                        console.log("case 2");
                        receivedMessage.channel.send("Reply hazy, try again.");
                        break;
                    case 3:
                        console.log("case 3");
                        receivedMessage.channel.send("Ask again later.");
                        break;
                    case 4:
                        console.log("case 4");
                        receivedMessage.channel.send("Don't count on it.");
                        break;
                    case 5:
                        console.log("case 5");
                        receivedMessage.channel.send("Outlook not so good.");
                        break;
                    case 6:
                        console.log("case 6");
                        receivedMessage.channel.send("Without a doubt.");
                        break;
                    case 7:
                        console.log("case 7");
                        receivedMessage.channel.send("Yes - definitely.");
                        break;
                    case 8:
                        console.log("case 8");
                        receivedMessage.channel.send("You may rely on it.");
                        break;
                    case 9:
                        console.log("case 9");
                        receivedMessage.channel.send("As I see it, yes.");
                        break;
                    case 10:
                        console.log("case 10");
                        receivedMessage.channel.send("Most likely.");
                        break;
                    case 11:
                        console.log("case 11");
                        receivedMessage.channel.send("Outlook good.");
                        break;
                    case 12:
                        console.log("case 12");
                        receivedMessage.channel.send("Signs point to yes.");
                        break;
                    case 13:
                        console.log("case 13");
                        receivedMessage.channel.send("Better not tell you now.");
                        break;
                    case 14:
                        console.log("case 14");
                        receivedMessage.channel.send("Cannot predict now.");
                        break;
                    case 15:
                        console.log("case 15");
                        receivedMessage.channel.send("Concentrate and ask again.");
                        break;
                    case 16:
                        console.log("case 16");
                        receivedMessage.channel.send("My sources say no.");
                        break;
                    case 17:
                        console.log("case 17");
                        receivedMessage.channel.send("Outlook not so good.");
                        break;
                    case 18:
                        console.log("case 18");
                        receivedMessage.channel.send("Very doubtful.");
                        break;
                }
                break;
            }
    }
    return;
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//const { token } = require('./config.json');
client.login(process.env.token);