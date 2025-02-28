const { EmbedBuilder } = require('discord.js');
const { formatTimestamp } = require('../utils/helpers');

const userinfo = async (client, message, args) => {
    const target = message.mentions.users.first() || message.author;
    const member = message.guild.members.cache.get(target.id);
    
    if (!member) {
        return message.reply('User not found in this server.');
    }
    
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`User Information: ${target.tag}`)
        .setThumbnail(target.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: 'User ID', value: target.id, inline: true },
            { name: 'Nickname', value: member.nickname || 'None', inline: true },
            { name: 'Bot', value: target.bot ? 'Yes' : 'No', inline: true },
            { name: 'Account Created', value: formatTimestamp(target.createdTimestamp), inline: true },
            { name: 'Joined Server', value: formatTimestamp(member.joinedTimestamp), inline: true },
            { name: 'Roles', value: member.roles.cache.size > 1 ? member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r.name).join(', ') : 'None' }
        )
        .setTimestamp();
    
    await message.reply({ embeds: [embed] });
};

const serverinfo = async (client, message, args) => {
    const guild = message.guild;
    
    const totalMembers = guild.memberCount;
    const createdAt = formatTimestamp(guild.createdTimestamp);
    const boostLevel = guild.premiumTier ? `Level ${guild.premiumTier}` : 'None';
    const boostCount = guild.premiumSubscriptionCount || 0;
    
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`Server Information: ${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields(
            { name: 'Server ID', value: guild.id, inline: true },
            { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
            { name: 'Created At', value: createdAt, inline: true },
            { name: 'Members', value: totalMembers.toString(), inline: true },
            { name: 'Boost Level', value: boostLevel, inline: true },
            { name: 'Boost Count', value: boostCount.toString(), inline: true },
            { name: 'Channels', value: guild.channels.cache.size.toString(), inline: true },
            { name: 'Roles', value: guild.roles.cache.size.toString(), inline: true },
            { name: 'Emojis', value: guild.emojis.cache.size.toString(), inline: true }
        )
        .setTimestamp();
    
    await message.reply({ embeds: [embed] });
};

const ping = async (client, message, args) => {
    const sent = await message.reply('Pinging...');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    
    await sent.edit(`Pong! Latency: ${latency}ms | API Latency: ${Math.round(client.ws.ping)}ms`);
};

module.exports = {
    userinfo,
    serverinfo,
    help: require('./help').help,
    ping
};
