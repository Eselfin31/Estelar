require('dotenv').config();
const { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    Collection,
    Events
} = require('discord.js');

const generalCommands = require('./commands/general');
const docsCommands = require('./commands/docs');
const snippetCommands = require('./commands/snippet');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildModeration
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
});

client.commands = new Collection();

const registerCommands = () => {
    for (const [name, execute] of Object.entries(generalCommands)) {
        client.commands.set(name, execute);
    }
    
    for (const [name, execute] of Object.entries(docsCommands)) {
        client.commands.set(name, execute);
    }
    
    for (const [name, execute] of Object.entries(snippetCommands)) {
        client.commands.set(name, execute);
    }
    
    console.log(`Registered ${client.commands.size} commands`);
};

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
    registerCommands();
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return;
    
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    if (!client.commands.has(commandName)) return;
    
    try {
        await client.commands.get(commandName)(client, message, args);
    } catch (error) {
        console.error(error);
        await message.reply('There was an error executing that command.');
    }
});

client.login(process.env.DISCORD_TOKEN);

client.on('error', console.error);
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});
