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

    if (command === "gamedeal") {
        if (args.length === 0) {
            msg.channel.send("'gamedeal [name]|[where]|[ends in hours]|[link]|[additional info]");
        } else {
            var jargs = args.join(' ');
            jargs = jargs.split("|");
            var argsarray = new Array();
            for (var i = 0; i < jargs.length; i++) {
                argsarray.push(jargs[i]);
            }

            var date1 = moment();
            date1.format();
            date1.add(argsarray[2], 'h')

            msg.channel.send("<@&390230221183254528>");
            msg.channel.send({
                embed: {
                    color: 1043467,
                    title: "New game deal!",
                    url: argsarray[3],
                    fields: [{
                        name: "Beep boop",
                        value: argsarray[0] + " game is free on " + argsarray[1] + " right now. The offer ends in " + argsarray[2] + " hours after posting this. Get your key at " + argsarray[3]
                    }],
                    timestamp: date1,
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "Offer ends"
                    }
                }
            });
            if (argsarray[4] != undefined) {
                msg.channel.send("```Additional info: " + argsarray[4] + "```");
            }

            msg.delete(5);
        }
    }

    if (command === "announce") {
        var argss = "";
        for (var i = 0; i < args.length; i++) {
            argss = argss + " " + args[i];
        }

        msg.channel.send({
            embed: {
                color: 8521729,
                fields: [{
                    name: "Announcement:",
                    value: argss
                }]
            }
        });

        msg.delete(5);
    }

    if (command === "eval") {
    if(msg.author.id !== config.ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      msg.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
    }
    

});

client.login(token);

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }
