const { Client, MessageEmbed } = require('discord.js')
const bot = new Client()
const util = require('minecraft-server-util')
const prefix = '!'

bot.on('ready', () => {
    console.log('Server Status Bot is online!')
})

bot.on('message', message => {

    let args = message.content.substring(prefix.length).split(/ +/)
    
    switch(args[0]){
        case 'stat':
            if(!args[1]) return message.channel.send('Minecraft Server IP Address required.')
 
            util.status(aliases(args))
                .then((response) => {
                    message.channel.send(infoEmbed(response))
                })
                .catch((error, undefined) => {
                    console.log(error);
                    if(error != null) return message.channel.send(`Failed to get server info, maybe you spelled it wrong? Try again later.\nIf this error persists, either the server is down or there\'s a bug in my code.\n\|\| ${error} \|\|`)
                    else if(undefined == undefined) return message.channel.send(`Failed to get server info, maybe you spelled it wrong? Try again later.\nIf this error persists, either the server is down or there\'s a bug in my code.\n\|\| ${undefined} (That means the server is probably off.)\|\|`)
                    throw error;
                });                               
        }
    }
)

function printPlayers(players) {
    if(players == null) return ''
    else {
        let samplePlayers = players.map((player) => player.name).join(', ').replace(/§a|§b|§c|§d|§e|§f|§g|§k|§l|§m|§n|§o|§r|§1|§2|§3|§4|§5|§6|§7|§8|§9|Â/g, '').replace(/_/g, '\\_');
        let viewPlayers = ` (${samplePlayers})`;
        return viewPlayers;
    }
}

function infoEmbed(response) {
    let betterDesc = response.description.descriptionText.replace(/§a|§b|§c|§d|§e|§f|§g|§k|§l|§m|§n|§o|§r|§1|§2|§3|§4|§5|§6|§7|§8|§9|Â|â/g, '').replace(/\x98/g, ':snowman:').replace(/\x83/g, ':snowman2:').trim()
    const Embed = new MessageEmbed()
    .setTitle(`'${response.host}' Server Info`)
    .setColor('#2a9c34')
    .addFields(
        {name: 'IP Address', value: `${response.host} (:${response.port})`},
        {name: 'MOTD', value: betterDesc},
        {name: 'Version', value: response.version},
        {name: 'Players', value: `${response.onlinePlayers} / ${response.maxPlayers} ${printPlayers(response.samplePlayers)}`},
        {name: 'Protocol Version', value: response.protocolVersion}
    )
    return Embed;
}

function aliases(args) {
    if(args[1] == 'alias1' | args[1] == 'alias1.1' | args[1] == 'alias1.2') return 'alias1 IP address';
    else if(args[1] == 'hypixel' | args[1] == 'Hypixel' | args[1] == 'hypix' | args[1] == 'hypixle') return 'hypixel.net';
        else if(args[1] == 'alias3' | args[1] == 'alias3.1' | args[1] == 'alias3.2' | args[1] == 'alias3.3' ) return 'alias3 IP address';
// Etc...
}

bot.login('your-discord-bot-token-here')
