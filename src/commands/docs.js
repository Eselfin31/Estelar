const { EmbedBuilder } = require('discord.js');
const { getDocumentation, supportedLanguages, getLanguageCategories } = require('../utils/documentation');

/**
 * @param {Object} client - Discord client
 * @param {Object} message - Discord message
 * @param {Array} args - Command arguments
 */
const docs = async (client, message, args) => {
    if (args.length === 0) {
        return showLanguagesHelp(message);
    }

    if (args.length === 1) {
        const language = args[0].toLowerCase();
        
        if (language === 'languages' || language === 'list') {
            return showLanguagesHelp(message);
        }
        
        if (supportedLanguages.includes(language)) {
            return showLanguageTopics(message, language);
        } else {
            return message.reply(`Language "${language}" is not supported. Use \`!docs languages\` to see supported languages.`);
        }
    }

    const language = args[0].toLowerCase();
    const query = args.slice(1).join(' ');

    await message.channel.sendTyping();

    try {
        const result = await getDocumentation(language, query);

        if (!result.success) {
            return message.reply(result.message);
        }

        const embed = new EmbedBuilder()
            .setColor(getLanguageColor(language))
            .setTitle(result.title)
            .setURL(result.url)
            .setDescription(result.content)
            .setTimestamp()
            .setFooter({ text: `${language.charAt(0).toUpperCase() + language.slice(1)} Documentation` });

        await message.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error in docs command:', error);
        await message.reply('Sorry, I encountered an error while fetching the documentation. Please try again later.');
    }
};

/**
 * @param {Object} message - Discord message
 */
const showLanguagesHelp = async (message) => {
    const categories = getLanguageCategories();
    
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Documentation Command Help')
        .setDescription('Get documentation for various programming languages with `!docs <language> <query>`')
        .addFields(
            { 
                name: '📱 Web Development', 
                value: categories.web.map(lang => `\`${lang}\``).join(', ') 
            },
            { 
                name: '⚙️ Systems Programming', 
                value: categories.systems.map(lang => `\`${lang}\``).join(', ') 
            },
            { 
                name: '📜 Scripting Languages', 
                value: categories.scripting.map(lang => `\`${lang}\``).join(', ') 
            },
            { 
                name: 'Examples', 
                value: '`!docs javascript array`\n`!docs python list`\n`!docs typescript interface`\n`!docs java collections`' 
            },
            {
                name: 'Language Topics',
                value: 'To see common topics for a specific language, use `!docs <language>`'
            }
        )
        .setTimestamp()
        .setFooter({ text: 'Use !docs <language> to see language-specific topics' });
    
    await message.reply({ embeds: [embed] });
};

/**
 * @param {Object} message - Discord message
 * @param {string} language - The programming language
 */
const showLanguageTopics = async (message, language) => {
    const { getDocumentation, supportedLanguages } = require('../utils/documentation');
    
    try {
        const docSources = require('../utils/documentation').docSources;
        
        if (!docSources[language]) {
            return message.reply(`Language "${language}" is not supported.`);
        }
        
        const langInfo = docSources[language];
        const topics = Object.keys(langInfo.topics).map(topic => `\`${topic}\``).join(', ');
        
        const embed = new EmbedBuilder()
            .setColor(getLanguageColor(language))
            .setTitle(`${langInfo.name} Documentation Topics`)
            .setDescription(`Here are common topics for ${langInfo.name}:`)
            .addFields(
                { name: 'Common Topics', value: topics },
                { name: 'Usage', value: `\`!docs ${language} <topic>\`` },
                { name: 'Examples', value: `\`!docs ${language} ${Object.keys(langInfo.topics)[0]}\`\n\`!docs ${language} ${Object.keys(langInfo.topics)[Math.floor(Math.random() * Object.keys(langInfo.topics).length)]}\`` }
            )
            .setTimestamp()
            .setFooter({ text: `${langInfo.name} Documentation` });
        
        await message.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error showing language topics:', error);
        await message.reply('Sorry, I encountered an error while fetching the language topics. Please try again later.');
    }
};

/**
 * @param {string} language - The programming language
 * @returns {string} - Hex color code
 */
const getLanguageColor = (language) => {
    const colors = {
        javascript: '#F7DF1E', 
        typescript: '#3178C6', 
        python: '#3776AB',     
        java: '#007396',       
        csharp: '#239120',     
        html: '#E34F26',       
        css: '#1572B6',        
        react: '#61DAFB',      
        nodejs: '#339933',     
        go: '#00ADD8',         
        ruby: '#CC342D',       
        php: '#777BB4',        
        swift: '#FA7343',      
        rust: '#DEA584',       
        lua: '#000080',        
        kotlin: '#7F52FF',     
        c: '#555555',          
        cpp: '#00599C'         
    };
    
    return colors[language] || '#0099ff'; 
};

module.exports = {
    docs
};
