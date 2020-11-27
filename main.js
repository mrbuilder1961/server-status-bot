const {Client, MessageEmbed} = require('discord.js')
const { queryFull } = require('minecraft-server-util')
const bot = new Client()
const util = require('minecraft-server-util')
const prefix = '!'
 
bot.on('ready', () =>{
    console.log('Server Status Bot is online.')
})

bot.on('message', message =>{
 
    let args = message.content.substring(prefix.length).split(' ')
 
    switch(args[0]){
        case 'status':
 
            if(!args[1]) return message.channel.send('Minecraft Server IP Address required.')
 
            util.queryFull(args[1], {port:25565}) // Basically, this is the code that fetches the ip of a minecraft server (args[1]). 
                .then((response) => {             // Then, after it gets the data (response) it logs it in the console. All good.
                    console.log(response);
                })
                .catch((error) => {               // Also, this is all in a Discord Bot, and this is Javascript with node.js,
                    throw error;                  // discord.js, and npm minecraft-server-util package (node package manager)
                });                               
            const Embed = new MessageEmbed()      // But here, it tries to make a embed message (basically a fancy message). 
            .setTitle('Server Info')              // But it says that response.<data> isn't defined.
            .addField('\u200b', '\u200b')         // If I put the code inside the embed, it doesn't work.
            .setColor('#55c93f')                  // Do you know how to make the Embed function recognize the response variable exists?
            .addFields(                           // I believe if that is fixed, I can fix any other problems that occur myself.
                {name: 'IP Address', value: response.host + '(:' + response.port + ')'},
                {name: 'Version', value: response.version},
                {name: 'MOTD', value: response.description},
                {name: 'Players', value: response.onlinePlayers + ' / ' + response.maxPlayers},
                {name: 'Plugins', value: response.plugins}
            )
            message.channel.send(Embed)
            }
    }
)

bot.login('NzgxMjk1OTk3MDcwMjEzMTQz.X77kmQ.yMXV6Wy2LI0p4t_Ovl46mOo1Ka4')