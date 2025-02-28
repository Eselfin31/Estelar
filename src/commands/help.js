const { EmbedBuilder } = require('discord.js');

/**
 * @param {Object} client - Discord client
 * @param {Object} message - Discord message
 * @param {Array} args - Command arguments
 */
const help = async (client, message, args) => {
    const prefix = process.env.PREFIX || '!';
    
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Bot Commands')
        .setDescription(`Here are all the available commands for this bot. Use \`${prefix}help [command]\` for more information about a specific command.`)
        .addFields(
            { name: '📝 General', value: `\`${prefix}help\` - Display this help message\n\`${prefix}serverinfo\` - Display server information\n\`${prefix}userinfo\` - Display user information` },
            { name: '📚 Documentation', value: `\`${prefix}docs\` - Look up programming language documentation` },
            { name: '💻 Code Tools', value: `\`${prefix}snippet\` - Format code for Discord` }
        )
        .setFooter({ text: 'Bot created with Discord.js' });
    
    if (args.length > 0) {
        const commandName = args[0].toLowerCase();
        
        switch (commandName) {
            case 'docs':
                embed
                    .setTitle('Documentation Command')
                    .setDescription('Look up programming language documentation')
                    .spliceFields(0, 4)
                    .addFields(
                        { name: 'Usage', value: `\`${prefix}docs <language> <query>\`` },
                        { name: 'Examples', value: `\`${prefix}docs javascript array\`\n\`${prefix}docs python list\`\n\`${prefix}docs react hooks\`` },
                        { name: 'Supported Languages', value: 'Type !docs to see the languages' }
                    );
                break;
            
            case 'snippet':
                embed
                    .setTitle('Snippet Command')
                    .setDescription('Format code for better readability in Discord')
                    .spliceFields(0, 4)
                    .addFields(
                        { name: 'Usage', value: `\`${prefix}snippet <language> <code>\`` },
                        { name: 'Example', value: `\`${prefix}snippet javascript const hello = "world";\`` },
                        { name: 'Supported Languages', value: 'javascript, python, java, html, css, c, cpp, csharp, go, rust, ruby, php, typescript, lua, kotlin, and more!' }
                    );
                break;

            case 'serverinfo':
                embed
                    .setTitle('Server Info Command')
                    .setDescription('Display information about the server')
                    .spliceFields(0, 4)
                    .addFields(
                        { name: 'Usage', value: `\`${prefix}serverinfo\`` }
                    );
                break;

            case 'help':
                embed
                    .setTitle('For real?')
                    .setDescription('This makes no sense')
                    .spliceFields(0, 4);
                break;

            case 'userinfo':
                embed
                    .setTitle('User Info Command')
                    .setDescription('Display information about a user')
                    .spliceFields(0, 4)
                    .addFields(
                        { name: 'Usage', value: `\`${prefix}userinfo [@user]\`` },
                        { name: 'Examples', value: `\`${prefix}userinfo\` - Shows your info\n\`${prefix}userinfo @username\` - Shows mentioned user's info` }
                    );
                break;
            
            default:
                embed
                    .setTitle('Command Not Found')
                    .setDescription(`The command \`${commandName}\` was not found. Use \`${prefix}help\` to see all available commands.`)
                    .spliceFields(0, 4);
        }
    }
    
    await message.reply({ embeds: [embed] });
};

module.exports = {
    help
};
