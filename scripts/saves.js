import DataSave from './libs/datasave.js';
import Events from './libs/events.js';
let PlayerDataPromise = DataSave.create('playerData');
export let PlayerData;
Events.on('playerCreated', async (evd) => {
    PlayerData = await PlayerDataPromise;
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
