import Events from './libs/events.js';

Events.on('beforeChat', (evd) => {
  if (evd.message.startsWith('!')) evd.cancel = true;
});
