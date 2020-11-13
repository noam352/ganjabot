const Discord = require("discord.js");
var cheerio = require("cheerio"); /* Used to extract html content, based on jQuery || install with npm install cheerio */
var request = require("request");
const client2 = new Discord.Client();
const config = require("./config.json");
const ytdl = require('ytdl-core');
const axios = require("axios");
const express = require('express');
const app = express();
const imageSearch = require('image-search-google');
 
const Client = new imageSearch('37544b592256efd3e', 'AIzaSyB4zIV7etjqMSHZ6FrxhF-hVS0bMCzwP6w');
const options2 = {page:1};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

client2.on("ready", () => {
    console.log("bot is on");
});


client2.on("message", async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    //console.log("command is",command);
    if (command === 'hi' || command === 'hello'){
        message.reply('nat is fat');
    }else if(command === "im" && args[0] === "blue"){
        message.reply("da ba dee da ba die");
    }else if(command === "if_anything"){
        message.reply("then allan");
    }else if (command === "ez"){
        if (message.channel.type === 'dm') return;
            const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
        }
        
        voiceChannel.join().then(connection => {
			const stream = ytdl('https://www.youtube.com/watch?v=Js7O-TS3-5A&t=2s', { filter: 'audioonly' });
			const dispatcher = connection.play(stream);
            image(message,["ez4ence"]);
            client2.on('message', async msg =>{
                if (msg.content === "stop"){
                    voiceChannel.leave();
                }
            });
        	dispatcher.on('finish', () => voiceChannel.leave());
		});
    }else if (command === "americano"){
        if (message.channel.type === 'dm') return;
        const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
            //const stream = ytdl('https://www.youtube.com/watch?v=a0r0jznFjA8', { filter: 'audioonly' });
            const stream = ytdl('https://www.youtube.com/watch?v=3PXFA1cjjEY', { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

            client2.on('message', async msg =>{
                if (msg.content === "stop"){
                    voiceChannel.leave();
                }
            });
        	dispatcher.on('finish', () => voiceChannel.leave());
		});
    }else if(command === "rps"){
        //console.log("command rps begun");
        var x = getRandomInt(10);
        var y = 0;
        const channel = client2.channels.cache.find(channel => channel.name === "munch_time");
        if (x == 1){
            if (args[0] === "paper"){
                channel.send("rock! Wait how did my bot lose?");
            }else if(args[0] === "rock"){
                channel.send("scissors! Wait how did my bot lose?");
            }else if(args[0] === "scissors"){
                channel.send("paper!. Wait how did my bot lose?");
            }else{
                y = 1;
                channel.send("not a valid move, unlucky i was gonna lose");
            }
            if (y == 0){
                if (message.channel.type === 'dm') return;

                const voiceChannel = message.member.voice.channel;
        
                if (!voiceChannel) {
                    return message.reply('please join a voice channel first!');
                }
        
                voiceChannel.join().then(connection => {
                    const stream = ytdl('https://www.youtube.com/watch?v=Js7O-TS3-5A&t=2s', { filter: 'audioonly' });
                    const dispatcher = connection.play(stream);
                    client2.on('message', async msg =>{
                        if (msg.content === "stop"){
                            voiceChannel.leave();
                        }
                    });
                    dispatcher.on('finish', () => voiceChannel.leave());
                });
            }
        }else if (args[0] === "paper"){
            channel.send("scissors, you suck");
        }else if(args[0] === "scissors"){
            channel.send("rock, uninstall discord");
        }else if(args[0] === "rock"){
            channel.send("paper, im the best");
        }else{
            channel.send("not a valid move");
        }
    }else if (command === "img"){
        //image(message,args.join(" "));
        ur(args,message);
    }else if (command === "play"){
        var id = play(message,args);
        //console.log(id);
    }
});
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
client2.login(config.token);



function image(message,input){
    console.log(input);
    input = "https://results.dogpile.com/serp?qc=images&q="+input;
    var options = {
        url: input,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            console.log(error);
            return;
        }
        $ = cheerio.load(responseBody); 
        var links = $(".image a.link");
        //console.log(links,typeof links);
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        var rand = Math.floor(getRandomInt(5));
        var pick = urls[rand];

        if (!urls.length) {
            console.log("errored 2");
            return;
        }
        message.channel.send(pick);
        
    });
}

function ur(args,message){
    var s = args.join(" ");
    Client.search(s, {page:1})
    .then(images => {
        var item = String(images[0].url);
        message.channel.send(item);
        //image(message,item);
    })
    .catch(error => console.log(error)
    );
}


function play(message,args){
    var uri = "https://www.googleapis.com/youtube/v3/search?key="
    var type = "video&part=snippet&maxResults=1&q=" + args.join("%20");
    var key = "AIzaSyBZ2hmqEUON-QLX-kZcpzdTy4trDMJROOQ";
    var final = uri+key+"&type="+type;

    var temp;
     axios.get(final).then(response =>{
        var item = response.data.items[0];
        var temp=item.id.videoId;
        console.log(temp);
        ///
        if (message.channel.type === 'dm') return;
        const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
            //const stream = ytdl('https://www.youtube.com/watch?v=a0r0jznFjA8', { filter: 'audioonly' });
            const stream = ytdl("https://www.youtube.com/watch?v="+temp, { filter: 'audioonly' });
			const dispatcher = connection.play(stream);
            message.reply("https://www.youtube.com/watch?v="+temp);
            client2.on('message', async msg =>{
                if (msg.content === "stop"){
                    voiceChannel.leave();
                }
            });
        	dispatcher.on('finish', () => voiceChannel.leave());
		});
        ///
 
     })
     .catch(error => {
         console.log(error);
     });
     //console.log(temp);
     return temp;
}
