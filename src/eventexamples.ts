import Events from './libs/events.js';
import { print } from './libs/utils/print.js';

Events.on('playerCreated', (evd) => {
  print(`${evd.player.name} has loaded in`);
});

Events.on('worldStarted', (evd) => {
  print(`The world has started after ${evd.tickStamp} ticks`);
});

Events.on('JSONRequest', (evd) => {
  if (evd.request.print) {
    print('hey! this request was sent with the id: ' + evd.senderId);
  }
});
