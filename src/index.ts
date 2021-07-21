import Events from './libs/events.js';
import { print, runCommand } from './libs/general.js';

Events.on('beforeChat', (evd) => {
  evd.cancel = true;
  runCommand(`tellraw @a {"rawtext":[{"text":"${evd.sender.name}: ${evd.message}"}]}`);
});

Events.on('playerCreated', (evd) => {
  print(`${evd.player.name} has loaded in`);
});

Events.on('worldStarted', (evd) => {
  print(`The world has started after ${evd.tickStamp} ticks`);
});
