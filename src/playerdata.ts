import { ChatCommands } from './mblib/chatcommands.js';
import DataSave from './mblib/datasave.js';
import Events from './mblib/events.js';
import { selectorFromPlayerId } from './mblib/utils/player.js';
import { print } from './mblib/utils/print.js';
import { sendMsg } from './mblib/utils/sendmessage.js';
import { getCharLengthWords } from './mblib/utils/string.js';

interface PlayerData {
  save(): void;
  data: {
    [playerId: string]: {
      name: string;
      prefix: string;
      suffix: string;
      chatSeparator: string;
      chatPrefix: string;
      chatSuffix: string;
    };
  };
}

export let PlayerData: PlayerData = DataSave.get('playerData');

export const defaultPlayerDataEntry = {
  name: '',
  prefix: '§8[§7Member§8]§7 ',
  suffix: '',
  chatSeparator: '§r:',
  chatPrefix: '',
  chatSuffix: ''
};

Events.on('playerCreated', (evd) => {
  print(`${evd.player.name} [${evd.playerId}]'s player save has been loaded`);
  if (!PlayerData.data[evd.playerId]) PlayerData.data[evd.playerId] = defaultPlayerDataEntry;

  PlayerData.data[evd.playerId].name = evd.player.name;
});

Events.on('playerRemoved', (evd) => {
  print(`${evd.playerName} has been unloaded, PlayerData has been saved`);
  PlayerData.save();
});

ChatCommands.register(
  'setdata',
  'Sets the value for a key on the specified player data',
  'setdata <key: prefix | suffix | chatPrefix | chatSuffix | chatSeparator> <value: string>',
  [],
  (msg, args, argStr) => {
    if (!PlayerData.data[args[0]]) {
      sendMsg(selectorFromPlayerId(msg.senderId), `§cNo player data found with id '${args[0]}'`);
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
      case 'chatSeparator':
        data.chatSeparator = arg2;
        break;
      default:
        sendMsg(selectorFromPlayerId(msg.senderId), `§cNo valid key called '${args[1]}' was found in player '${args[0]}'`);
    }
  }
);
