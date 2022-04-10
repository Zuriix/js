const RPC = require('discord-rpc');
const moment = require('moment');
const client = new RPC.Client({transport: 'ipc'});

const CONFIG = {
    // Client Settings
    clientId: '962642096639074304',

    // RPC Options
    timeFormat: 'hh:mm:ss A',
    dateFormat: 'dddd (MMMM Do)',
    largeImageKey: null,
    largeImageText: null,
    smallImageKey: null,
    smallImageText: null,
    updateInterval: 1000,
}

client.on('ready', () => {
    setInterval(() => {
        let finalPresence = {};

        let time = moment().format(CONFIG.timeFormat);
        let date = moment().format(CONFIG.dateFormat);

        /* Defaults */
        let avatar = client.user.avatar;
        finalPresence['largeImageKey'] = `https://cdn.discordapp.com/avatars/${client.user.id}/${avatar + (avatar.startsWith('a_')?'.gif':'.png')}?size=4096`;

        time && (finalPresence.details = time);
        date && (finalPresence['state'] = date);
        CONFIG.largeImageKey && (finalPresence['largeImageKey'] = CONFIG.largeImageKey);
        CONFIG.largeImageText && (finalPresence['largeImageText'] = CONFIG.largeImageText);
        CONFIG.smallImageKey && (finalPresence['smallImageKey'] = CONFIG.smallImageKey);
        CONFIG.smallImageText && (finalPresence['smallImageText'] = CONFIG.smallImageText);
        CONFIG.instance && (finalPresence['instance'] = CONFIG.instance);
        
        client.setActivity(finalPresence);
    }, CONFIG.updateInterval);
})

client.login({clientId: CONFIG.clientId});
