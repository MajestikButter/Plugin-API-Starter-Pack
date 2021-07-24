import DataSave from './libs/datasave.js';
import Events from './libs/events.js';
export let PlayerData = DataSave.get('playerData');
Events.on('playerCreated', async (evd) => {
    if (PlayerData.data[evd.playerId]) {
        PlayerData.data[evd.playerId].name = evd.player.name;
        return;
    }
    PlayerData.data[evd.playerId] = {
        name: evd.player.name,
        prefix: '§8[§7Member§8]§7 ',
        suffix: '',
        chatPrefix: '',
        chatSuffix: ''
    };
});
