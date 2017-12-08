//https://discordapp.com/oauth2/authorize?client_id=369095516589654026&scope=bot&permissions=2134240503
var fs = require("fs");
var Discord = require("discord.js");
var client = new Discord.Client();
var logger = require('./logger');
var moment = require('moment');
const config = require("./config.json");
const token = config.token;

client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`);
});



client.on('message', msg => {

    if (msg.author.bot) return;
    if (!msg.content.startsWith(config.prefix)) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    if (command === "debug") {
        logger.trace("trace");
        logger.info("info");
        logger.warn("warn");
        logger.debug("debug");
        logger.crit("crit");
        logger.fatal("fatal");
    }



    if (command == "trivia") {
        msg.reply("WIP");
        if (args.length > 2) {
            if (args === "enable") {

            }
            else if (args === "join") {

            }
        }
    }

    if (command === "help") {
        msg.react("✅")
            .catch(logger.warn);

        msg.reply({
            embed: {
                color: 660099,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "TriviaB0T's commands",
                description: "Embed test",
                fields: [{
                    name: "Info",
                    value: "Info here"
                },
                {
                    name: "Commands",
                    value: "Commands here"
                }
                ],
                timestamp: config.lastupdate,
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "Last updated at"
                }
            }
        });

    }

    if (command === "humble") {
        if (args.length == 3) {
            var date1 = moment();
            date1.format();
            date1.add('h', args[1])

            msg.channel.send({
                embed: {
                    color: 1043467,
                    title: "New game deal!",
                    url: args[2],
                    fields: [{
                        name: "Beep boop",
                        value: args[0] + " steam key is free on humble bundle right now. The offer ends in " + args[1] + " hours after posting this. Get your key at " + args[2]
                    }],
                    timestamp: date1,
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "Offer ends"
                    }
                }
            });

            msg.delete(5);
        } else {
            msg.reply("Correct format: ```" + config.prefix + "humble [GAME NAME] [HOURS UNTIL END] [LINK]```");
            msg.reply("debug " + args.length);
        }
    }

});

client.login(token);
