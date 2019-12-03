const Discord = require('discord.js');
const Canvas = require('canvas');
const client = new Discord.Client();
var joinMessageChannel;

client.on('ready', () => {
    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity("Itou", { type: "WATCHING" });
    console.log("Logged on");
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return;
    }

    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage);
    }else{
        //check if message contains "time check"
        var messagesplit = receivedMessage.content.split(" ");
        for(i = 0; i < messagesplit.length-1; i++){
            if(messagesplit[i] === "time" && messagesplit[i+1] === "check"){

                var d = new Date();
                console.log(d.toLocaleTimeString());
                receivedMessage.channel.send("Time check! The time is currently " + d.toLocaleTimeString());
            }

        }
    }
});

// Pass the entire Canvas object because you'll need to access its width, as well its context
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

// Send image with member's profile pic and message
client.on('guildMemberAdd', async member => {
	// const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if (!joinMessageChannel){
        return;
    } 
    
    // Set a new canvas to the dimensions of 700x250 pixels
	const canvas = Canvas.createCanvas(700, 250);
	// ctx (context) will be used to modify a lot of the canvas
    const ctx = canvas.getContext('2d');

    // Since the image takes time to load, you should await it
    const background = await Canvas.loadImage('wallpaper.png');
    // Select the color of the stroke
	// This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
    
    // Draw circle and clip image
	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();


    // Wait for Canvas to load the image
	const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
	// Draw a shape onto the main canvas
    ctx.drawImage(avatar, 25, 0, 200, canvas.height);
    // Move the image downwards vertically and constrain its height to 200, so it's a square
	ctx.drawImage(avatar, 25, 25, 200, 200);
    
	// Use helpful Attachment class structure to process the file for you
	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
    
	joinMessageChannel.send(`Welcome to the server, ${member}!`, attachment);
});

function processCommand(receivedMessage) {
    var fullCommand = receivedMessage.content.substring(1);
    var splitCommand = fullCommand.split(" ");
    var primaryCommand = splitCommand[0];
    var arguments = splitCommand.slice(1);

    console.log("Command received: " + primaryCommand);
    console.log("Arguments: " + arguments);

    switch (primaryCommand) {
        case "8ball":
            if (arguments == "") {
                receivedMessage.channel.send("No question received.");
            }
            else {
                switch (randomNum(0, 18)) {
                    case 0:
                        receivedMessage.channel.send("It is certain.");
                        break;
                    case 1:
                        receivedMessage.channel.send("It is decidedly so.");
                        break;
                    case 2:
                        receivedMessage.channel.send("Reply hazy, try again.");
                        break;
                    case 3:
                        receivedMessage.channel.send("Ask again later.");
                        break;
                    case 4:
                        receivedMessage.channel.send("Don't count on it.");
                        break;
                    case 5:
                        receivedMessage.channel.send("Outlook not so good.");
                        break;
                    case 6:
                        receivedMessage.channel.send("Without a doubt.");
                        break;
                    case 7:
                        receivedMessage.channel.send("Yes - definitely.");
                        break;
                    case 8:
                        receivedMessage.channel.send("You may rely on it.");
                        break;
                    case 9:
                        receivedMessage.channel.send("As I see it, yes.");
                        break;
                    case 10:
                        receivedMessage.channel.send("Most likely.");
                        break;
                    case 11:
                        receivedMessage.channel.send("Outlook good.");
                        break;
                    case 12:
                        receivedMessage.channel.send("Signs point to yes.");
                        break;
                    case 13:
                        receivedMessage.channel.send("Better not tell you now.");
                        break;
                    case 14:
                        receivedMessage.channel.send("Cannot predict now.");
                        break;
                    case 15:
                        receivedMessage.channel.send("Concentrate and ask again.");
                        break;
                    case 16:
                        receivedMessage.channel.send("My sources say no.");
                        break;
                    case 17:
                        receivedMessage.channel.send("Outlook not so good.");
                        break;
                    case 18:
                        receivedMessage.channel.send("Very doubtful.");
                        break;
                }
                break;
            }

            break;
        case "uptime":
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.round(totalSeconds % 60);

            receivedMessage.channel.send("Naitou has been running for " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds");
            break;
        case "joinforce":
                client.emit('guildMemberAdd', receivedMessage.member);
            break;
        case "joinmessage":
            joinMessageChannel = receivedMessage.channel;
            receivedMessage.channel.send("Join message channel changed.");
        break;
    }   
    return;
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//  const { token } = require('./config.json');
// client.login(token);
client.login(process.env.token);