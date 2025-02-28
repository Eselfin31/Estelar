const { EmbedBuilder } = require('discord.js');

/**
 * @param {Object} client - Discord client
 * @param {Object} message - Discord message
 * @param {Array} args - Command arguments
 */
const snippet = async (client, message, args) => {
    if (args.length === 0) {
        return showSnippetHelp(message);
    }

    const language = args[0].toLowerCase();
    
    const code = args.slice(1).join(' ');
    
    if (!code || code.trim() === '') {
        return message.reply('Please provide some code to format.');
    }
    
    const formattedCode = formatCodeForDiscord(language, code);
    
    message.channel.send(formattedCode);
};

/**
 * @param {Object} message - Discord message
 */
const showSnippetHelp = (message) => {
    const embed = new EmbedBuilder()
        .setTitle('Code Snippet Command')
        .setDescription('Format your code for better readability in Discord')
        .setColor('#0099ff')
        .addFields(
            { name: 'Usage', value: '`!snippet <language> <code>`' },
            { name: 'Example', value: '`!snippet javascript const hello = "world";`' },
            { name: 'Supported Languages', value: 'javascript, python, java, html, css, c, cpp, csharp, go, rust, ruby, php, typescript, lua, kotlin, and more!' }
        )
        .setFooter({ text: 'Tip: For multi-line code, use shift+enter to create line breaks' });
    
    message.channel.send({ embeds: [embed] });
};

/**
 * @param {string} language - The programming language
 * @param {string} code - The code to format
 * @returns {string} - Formatted code
 */
const formatCodeForDiscord = (language, code) => {
    const languageMap = {
        'js': 'javascript',
        'py': 'python',
        'ts': 'typescript',
        'cs': 'csharp',
        'c#': 'csharp',
        'c++': 'cpp',
        'html': 'html',
        'css': 'css',
        'java': 'java',
        'go': 'go',
        'rust': 'rust',
        'rb': 'ruby',
        'ruby': 'ruby',
        'php': 'php',
        'lua': 'lua',
        'kt': 'kotlin',
        'kotlin': 'kotlin'
    };
    
    const formattedLanguage = languageMap[language] || language;
    
    return `\`\`\`${formattedLanguage}\n${code}\n\`\`\``;
};

module.exports = {
    snippet
};
