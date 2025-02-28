const logAction = async (client, action, moderator, target, reason) => {
    const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID);
    if (!logChannel) return;
    
    await logChannel.send({
        content: `**${action}** | Moderator: ${moderator.tag} (${moderator.id}) | Target: ${target.tag} (${target.id}) | Reason: ${reason || 'No reason provided'}`
    });
};

const hasPermission = (member, permission) => {
    return member.permissions.has(permission);
};

const parseDuration = (duration) => {
    if (!duration) return 0;
    
    const match = duration.match(/^(\d+)([smhdw])$/);
    if (!match) return 0;
    
    const value = parseInt(match[1]);
    const unit = match[2];
    
    switch (unit) {
        case 's': return value * 1000;
        case 'm': return value * 60 * 1000;
        case 'h': return value * 60 * 60 * 1000;
        case 'd': return value * 24 * 60 * 60 * 1000;
        case 'w': return value * 7 * 24 * 60 * 60 * 1000;
        default: return 0;
    }
};

const generateTicketId = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
};

module.exports = {
    logAction,
    hasPermission,
    parseDuration,
    generateTicketId,
    formatTimestamp
};
