import { Effect, Entity, Player, World } from 'Minecraft';
import EventEmitter, { EventListener } from './eventemitter.js';
import Scoreboard from './scoreboard.js';
import { runCommand, runCommands } from './utils/runcommand.js';

type EventNames = 'beforeChat' | 'chat' | 'effectAdded' | 'playerCreated' | 'playerRemoved' | 'tick' | 'worldStarted';
interface Events {
  listeners(eventName: EventNames): EventListener[];

  emit(eventName: 'beforeChat', evd: { sender: Player; senderId: string; message: string; cancel: boolean }): any;
  emit(eventName: 'chat', evd: { sender: Player; senderId: string; message: string }): any;
  emit(eventName: 'effectAdded', evd: { entity: Entity; effect: Effect; effectState: number }): any;
  emit(eventName: 'playerCreated', evd: { player: Player; playerId: string }): any;
  emit(eventName: 'playerRemoved', evd: { playerName: string }): any;
  emit(eventName: 'tick', evd: { tickStamp: number }): any;
  emit(eventName: 'worldStarted', evd: { tickStamp: number }): any;

  on(eventName: 'beforeChat', eventCallback: (evd: { sender: Player; senderId: string; message: string; cancel: boolean }) => any): any;
  on(eventName: 'chat', eventCallback: (evd: { sender: Player; senderId: string; message: string }) => any): any;
  on(eventName: 'effectAdded', eventCallback: (evd: { entity: Entity; effect: Effect; effectState: number }) => any): any;
  on(eventName: 'playerCreated', eventCallback: (evd: { player: Player; playerId: string }) => any): any;
  on(eventName: 'playerRemoved', eventCallback: (evd: { playerName: string }) => any): any;
  on(eventName: 'tick', eventCallback: (evd: { tickStamp: number }) => any): any;
  on(eventName: 'worldStarted', eventCallback: (evd: { tickStamp: number }) => any): any;

  once(eventName: 'beforeChat', eventCallback: (evd: { sender: Player; senderId: string; message: string; cancel: boolean }) => any): any;
  once(eventName: 'chat', eventCallback: (evd: { sender: Player; senderId: string; message: string }) => any): any;
  once(eventName: 'effectAdded', eventCallback: (evd: { entity: Entity; effect: Effect; effectState: number }) => any): any;
  once(eventName: 'playerCreated', eventCallback: (evd: { player: Player; playerId: string }) => any): any;
  once(eventName: 'playerRemoved', eventCallback: (evd: { playerName: string }) => any): any;
  once(eventName: 'tick', eventCallback: (evd: { tickStamp: number }) => any): any;
  once(eventName: 'worldStarted', eventCallback: (evd: { tickStamp: number }) => any): any;
}
let Events: Events = new EventEmitter();
export default Events;

const playerIdObjective = new Scoreboard('playerId');
World.events.chat.subscribe((evd) => {
  let senderId = playerIdObjective.getScoreSelector(`"${evd.sender.name}"`);
  let emitEvd = {
    sender: evd.sender,
    senderId: senderId + '',
    message: evd.message
  };
  Events.emit('chat', emitEvd);
});

World.events.beforeChat.subscribe((evd) => {
  let senderId = playerIdObjective.getScoreSelector(`"${evd.sender.name}"`);
  let emitEvd = {
    sender: evd.sender,
    senderId: senderId + '',
    message: evd.message,
    cancel: evd.canceled
  };
  Events.emit('beforeChat', emitEvd);
  evd.canceled = emitEvd.cancel;
  evd.message = emitEvd.message;
});

World.events.addEffect.subscribe((evd) => {
  let emitEvd = {
    entity: evd.entity,
    effect: evd.effect,
    effectState: evd.effectState
  };
  Events.emit('effectAdded', emitEvd);
});

function setupPlayerIds() {
  if (playerIdObjective.getScoreSelector('"#id"') == 'none') {
    playerIdObjective.setScoreSelector('"#id"', -2147483648);
  }

  playerIdObjective.addScoreSelector('@a', 0);
  if (playerIdObjective.setScoreSelector('@p[scores={playerId=0}]', playerIdObjective.getScoreSelector('"#id"')))
    playerIdObjective.addScoreSelector('"#id"', 1);
}

let tickStamp = 0;
World.events.tick.subscribe(() => {
  setupPlayerIds();

  let emitEvd = {
    tickStamp: tickStamp
  };
  Events.emit('tick', emitEvd);
  tickStamp++;
});

let startedUp = false;
Events.on('tick', () => {
  if (runCommand('testfor @p').error) return;
  let pluginManagerExists = !runCommand('testfor @e[type=plugin:manager]').error;

  if (!pluginManagerExists) {
    runCommand('execute @r ~~~ tickingarea add 0 0 0 0 0 0 plugin_ticking');
    runCommand('execute @r ~~~ summon plugin:manager 0 1 0');
  } else {
    if (!startedUp) {
      Events.emit('worldStarted', {
        tickStamp: tickStamp
      });
      startedUp = true;
    }
  }
});

let prevTestfor: string[] = [];
Events.on('tick', () => {
  let testfor = runCommand('testfor @a');
  if (testfor.error) return;
  let currParsed = [];
  if (!testfor.result.statusMessage.includes(', ')) {
    currParsed = [testfor.result.statusMessage.slice(6)];
  } else {
    currParsed = testfor.result.statusMessage.slice(6).split(/, /g);
  }

  for (let name of currParsed) {
    if (prevTestfor.includes(name)) continue;

    let players = World.getPlayers();
    for (let player of players) {
      if (!player.name) continue;

      if (player.name == name) {
        let evd = { player: player, playerId: playerIdObjective.getScoreSelector(`"${player.name}"`) + '' };
        Events.emit('playerCreated', evd);
        break;
      }
    }
  }

  for (let name of prevTestfor) {
    if (currParsed.includes(name)) continue;
    let evd = { playerName: name };
    Events.emit('playerRemoved', evd);
  }

  prevTestfor = currParsed;
});
