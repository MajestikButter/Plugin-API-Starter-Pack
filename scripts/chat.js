import { ChatCommands } from './mblib/chatcommands.js';
import Events from './mblib/events.js';
import Scoreboard from './mblib/scoreboard.js';
import { getPlayerNames, selectorFromPlayerId } from './mblib/utils/player.js';
import { sendMsg } from './mblib/utils/sendmessage.js';
import { PlayerData } from './playerdata.js';
Events.on('beforeChat', (evd) => {
    let data = PlayerData.data[evd.senderId];
    if (!evd.cancel) {
        evd.cancel = true;
        sendMsg('@a', data.prefix + evd.sender.name + data.suffix + data.chatSeparator + data.chatPrefix + evd.message + data.chatSuffix);
    }
});
let playerIdObjective = new Scoreboard('playerId');
ChatCommands.register('playerlist', 'Gets a list of the players in the game and their ids', 'playerlist', [], (msg, args, argStr) => {
    let playerNames = getPlayerNames();
    let message = '§2--[§aPlayers (§bID§a)§2]--';
    for (let playerName of playerNames) {
        let id = playerIdObjective.getScoreSelector(`"${playerName}"`);
        message += `\n§2- §a${playerName} (§b${id}§a)`;
    }
    sendMsg(selectorFromPlayerId(msg.senderId), message);
});
