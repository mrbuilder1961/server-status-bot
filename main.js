const {Client, MessageEmbed} = require('discord.js')
const { queryFull } = require('minecraft-server-util')
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
 
            util.queryFull(args[1], {port:25565})
                .then((response) => {
                    console.log(response);
                    // the response is only available from within this util.queryFull block, which is why it was
                    // saying response is undefined--only this block of code knows about response. So I wrote a function
                    // so that we can send the response to it and use it (the new function is at the bottom); the new
                    // function will just return the MessageEmbed, which you can then send to the channel.
                    const Embed = handleResponse(response)
                    message.channel.send(Embed)
                })
                .catch((error) => {
                    throw error;
                });                               
        }
    }
)


function handleResponse(response) {
    const Embed = new MessageEmbed()
    .setTitle('"'+ response.host + '" Server Info')
    .setColor('#2a9c34')
    .addFields(
        {name: 'IP Address', value: response.host + ' ( :' + response.port + ')'},
        {name: 'Version & Software', value: response.version + ', ' + response.software},
        {name: 'Players', value: response.onlinePlayers + ' / ' + response.maxPlayers + ' ( ' + response.players + ' ) '},
        {name: 'Plugins', value: response.plugins},
        {name: 'Other Debug Info', value: 'SRV Record: "' + response.srvRecord + '"\nLevel Name: "'+ response.levelName + '"\nGame Type: "'+ response.gameType + '"'}
    )
    return Embed;
}

bot.login(token)
