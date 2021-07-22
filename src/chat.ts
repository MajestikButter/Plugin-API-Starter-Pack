import { ChatCommands } from './libs/chatcommands.js';
import Events from './libs/events.js';
import Scoreboard from './libs/scoreboard.js';
import { getPlayerNames, selectorFromPlayerId } from './libs/utils/player.js';
import { sendMsg, sendRawtext } from './libs/utils/sendmessage.js';
import { getCharLengthWords } from './libs/utils/string.js';
import { PlayerData } from './saves.js';

Events.on('beforeChat', (evd) => {
  let data = PlayerData.data[evd.senderId];
  if (!evd.cancel) {
    evd.cancel = true;
    sendRawtext('@a', [{ text: `${data.prefix}${evd.sender.name}${data.suffix}§r: ${data.chatPrefix}${evd.message}${data.chatSuffix}` }]);
  }
});

ChatCommands.register('setdata', 'Sets the value for a key on the specified player data', 'setdata <key: prefix | suffix | chatPrefix | chatSuffix> <value: string>', [], (msg, args, argStr) => {
  if (!PlayerData.data[args[0]]) {
    sendRawtext(selectorFromPlayerId(msg.senderId), [{ text: `§cNo player data found with id '${args[0]}'` }]);
    return;
  }
  let data = PlayerData.data[args[0]];

  let charCount = getCharLengthWords(argStr, 2);

  let arg2 = argStr.slice(charCount);
  switch (args[1]) {
    case 'prefix':
      data.prefix = arg2;
      break;
    case 'suffix':
      data.suffix = arg2;
      break;
    case 'chatPrefix':
      data.chatPrefix = arg2;
      break;
    case 'chatSuffix':
      data.chatSuffix = arg2;
      break;
    default:
      sendMsg(selectorFromPlayerId(msg.senderId), `§cNo valid key called '${args[1]}' was found in player '${args[0]}'`);
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
