import DataSave from './libs/datasave.js';
import Events from './libs/events.js';
import { print } from './libs/utils/print.js';
export let PlayerData = DataSave.get('playerData');
Events.on('playerCreated', (evd) => {
    print(`${evd.player.name} [${evd.playerId}]'s player save has been loaded`);
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
Events.on('playerRemoved', (evd) => {
    print(`${evd.playerName} has been unloaded, PlayerData has been saved`);
    PlayerData.save();
});
