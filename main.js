const {Client, MessageEmbed} = require('discord.js')
const bot = new Client()
const util = require('minecraft-server-util')
const prefix = '!'
const token = 'your-discord-token-here'
 
bot.on('ready', () =>{
    console.log('Server Status Bot is online!')
})

bot.on('message', message =>{
 
    let args = message.content.substring(prefix.length).split(' ')
 
    switch(args[0]){
        case 'status':
 
            if(!args[1]) return message.channel.send('Minecraft Server IP Address required.')
 
            util.status(args[1])
                .then((response) => {
                    console.log(response);
                    const Embed = handleResponse(response)

                    message.channel.send(Embed)
                })
                .catch((error) => {
                    console.log(error);
                    if(error != null, message.channel.send('Failed to get server info. Try again later.\nIf this error persists, either the server is down or there\'s a bug in my code.\nError: ||' + error + '||')) 
                    throw error;
                });                               
        }
    }
)

function handleResponse(response) {
    console.log(response.samplePlayers)
    const Embed = new MessageEmbed()
    .setTitle('"'+ response.host + '" Server Info')
    .setColor('#2a9c34')
    .addFields(
        {name: 'IP Address', value: response.host + ' ( :' + response.port + ')'},
        {name: 'Version', value: response.version},
        {name: 'Players', value: response.onlinePlayers + ' / ' + response.maxPlayers + ' ( ' + printPlayers(response.samplePlayers) + ' ) '},
        {name: 'Mod Info', value: response.modInfo},
        {name: 'Other Debug Info', value: 'Protocol Version: ' + response.protocolVersion}
    )
    return Embed;
}

// map through each player object to get an array of just player names
// and then turn that array into a string with .join (commas in between)
// so [p1, p2, 3] becomes 'p1, p2, p3'
function printPlayers(players) {
    return players.map((player) => player.name).join(', ');
}

bot.login(token)
