const {Client, MessageEmbed} = require('discord.js')
const bot = new Client()
const util = require('minecraft-server-util')
const prefix = '!'
const token = 'your-discord-bot-token-here'
 
bot.on('ready', () =>{
    console.log('Server Status Bot is online!')
})

bot.on('message', message =>{
 
    let args = message.content.substring(prefix.length).split(/ +/)

    
    switch(args[0]){
        case 'stat':
 
            if(!args[1]) return message.channel.send('Minecraft Server IP Address required.')
 
            util.status(serverAlias(args))
                .then((response) => {
                    console.log(response);
                    const Embed = handleResponse(response)
                    message.channel.send(Embed)
                })
                .catch((error) => {
                    console.log(error);
                    if(error != null) return message.channel.send(`Failed to get server info, maybe you spelled it wrong? Try again later.\nIf this error persists, either the server is down or there\'s a bug in my code.\n\|\| ${error} \|\|`)
                    throw error;
                });
        }
    }
)

function printPlayers(players) {
    if(players == null) return ''
    else {
        let playerRename1 = players.map((player) => player.name).join(', ').replace(/§a|§b|§c|§d|§e|§f|§g|§k|§l|§m|§n|§o|§r|§1|§2|§3|§4|§5|§6|§7|§8|§9|Â/g, '');
        let playerRename2 = playerRename1.replace(/_/g, '\_');
        let playerRename3 = ' (' + playerRename2 + ')';
        return playerRename3;
    }
}

function handleResponse(response) {
    let desc = response.description.descriptionText
    let betterDesc = desc.trim().replace(/§a|§b|§c|§d|§e|§f|§g|§k|§l|§m|§n|§o|§r|§1|§2|§3|§4|§5|§6|§7|§8|§9|Â|â|\x98|\x83/g, '')
    const Embed = new MessageEmbed()
    .setTitle('"'+ response.host + '" Server Info')
    .setColor('#2a9c34')
    .addFields(
        {name: 'IP Address', value: response.host + ' ( :' + response.port + ')'},
        {name: 'MOTD', value: betterDesc},
        {name: 'Version', value: response.version},
        {name: 'Players', value: response.onlinePlayers + ' / ' + response.maxPlayers + printPlayers(response.samplePlayers)},
        {name: 'Other Debug Info', value: 'Protocol Version: ' + response.protocolVersion}
    )
    return Embed;
}

function serverAlias(args) {
    if(args[1] != 'hypixel') return args[1];
    else(args[1] == 'hypixel')
        return 'mc.hypixel.net';
}

bot.login(token)
