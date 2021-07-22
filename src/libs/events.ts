import { Effect, Entity, Player, World } from 'Minecraft';
import { ChatCommands } from './chatcommands.js';
import EventEmitter, { EventListener } from './eventemitter.js';
import Scoreboard from './scoreboard.js';
import { getPlayerNames } from './utils/player.js';
import { runCommand } from './utils/runcommand.js';

type EventNames = 'beforeChat' | 'chat' | 'effectAdded' | 'playerCreated' | 'playerRemoved' | 'tick' | 'worldStarted';

export interface BeforeChatEVD {
  sender: Player;
  senderId: string;
  message: string;
  cancel: boolean;
  sendToTargets: boolean;
  targets: Player[];
}
export interface ChatEVD {
  sender: Player;
  senderId: string;
  message: string;
  sendToTargets: boolean;
  targets: Player[];
}
export interface EffectAddedEVD {
  entity: Entity;
  effect: Effect;
  effectState: number;
}
export interface PlayerCreatedEVD {
  player: Player;
  playerId: string;
}
export interface PlayerRemovedEVD {
  playerName: string;
}
export interface TickEVD {
  tickStamp: number;
}
export interface WorldStartedEVD {
  tickStamp: number;
}

interface Events {
  listeners(eventName: EventNames): EventListener[];

  emit(eventName: 'beforeChat', evd: BeforeChatEVD): any;
  emit(eventName: 'chat', evd: ChatEVD): any;
  emit(eventName: 'effectAdded', evd: EffectAddedEVD): any;
  emit(eventName: 'playerCreated', evd: PlayerCreatedEVD): any;
  emit(eventName: 'playerRemoved', evd: PlayerRemovedEVD): any;
  emit(eventName: 'tick', evd: TickEVD): any;
  emit(eventName: 'worldStarted', evd: WorldStartedEVD): any;

  on(eventName: 'beforeChat', eventCallback: (evd: BeforeChatEVD) => any): any;
  on(eventName: 'chat', eventCallback: (evd: ChatEVD) => any): any;
  on(eventName: 'effectAdded', eventCallback: (evd: EffectAddedEVD) => any): any;
  on(eventName: 'playerCreated', eventCallback: (evd: PlayerCreatedEVD) => any): any;
  on(eventName: 'playerRemoved', eventCallback: (evd: PlayerRemovedEVD) => any): any;
  on(eventName: 'tick', eventCallback: (evd: TickEVD) => any): any;
  on(eventName: 'worldStarted', eventCallback: (evd: WorldStartedEVD) => any): any;

  once(eventName: 'beforeChat', eventCallback: (evd: BeforeChatEVD) => any): any;
  once(eventName: 'chat', eventCallback: (evd: ChatEVD) => any): any;
  once(eventName: 'effectAdded', eventCallback: (evd: EffectAddedEVD) => any): any;
  once(eventName: 'playerCreated', eventCallback: (evd: PlayerCreatedEVD) => any): any;
  once(eventName: 'playerRemoved', eventCallback: (evd: PlayerRemovedEVD) => any): any;
  once(eventName: 'tick', eventCallback: (evd: TickEVD) => any): any;
  once(eventName: 'worldStarted', eventCallback: (evd: WorldStartedEVD) => any): any;
}
let Events: Events = new EventEmitter();
export default Events;

const playerIdObjective = new Scoreboard('playerId');
World.events.chat.subscribe((evd) => {
  let senderId = playerIdObjective.getScoreSelector(`"${evd.sender.name}"`);
  let emitEvd = {
    sender: evd.sender,
    senderId: senderId + '',
    message: evd.message,
    sendToTargets: evd.sendToTargets,
    targets: evd.targets
  };
  Events.emit('chat', emitEvd);
});

World.events.beforeChat.subscribe((evd) => {
  let senderId = playerIdObjective.getScoreSelector(`"${evd.sender.name}"`);
  let emitEvd = {
    sender: evd.sender,
    senderId: senderId + '',
    message: evd.message,
    cancel: evd.canceled,
    sendToTargets: evd.sendToTargets,
    targets: evd.targets
  };
  if (emitEvd.message.startsWith('!')) {
    ChatCommands.run(emitEvd);
    emitEvd.cancel = true;
  } else {
    Events.emit('beforeChat', emitEvd);
  }
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
  if (playerIdObjective.getScoreSelector('"#id"') === 'none') {
    playerIdObjective.setScoreSelector('"#id"', -2147483648);
  }

  playerIdObjective.addScoreSelector('@a', 0);
  let setPlayer = playerIdObjective.setScoreSelector('@p[scores={playerId=0}]', playerIdObjective.getScoreSelector('"#id"'));
  if (setPlayer) playerIdObjective.addScoreSelector('"#id"', 1);
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
Events.on('worldStarted', () =>
  Events.on('tick', () => {
    let playerNames = getPlayerNames();

    for (let name of playerNames) {
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
      if (playerNames.includes(name)) continue;
      let evd = { playerName: name };
      Events.emit('playerRemoved', evd);
    }

    prevTestfor = playerNames;
  })
);
