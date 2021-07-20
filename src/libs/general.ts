import { World, Commands, Player } from 'Minecraft';
import Events from './events.js';
import Scoreboard from './scoreboard.js';

export function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function print(msg: string) {
  runCommand('say : ' + msg);
}

type rawtextEntry = { text: string } | { translate: string; with?: string[] } | { score: { objective: string; name: string } } | { selector: string };
export function sendRawtext(playerName: string, JSONArr: rawtextEntry[]) {
  runCommand(`tellraw @p[name="${playerName}"] { "rawtext": ${JSON.stringify(JSONArr)} }`);
}

export function sendMsg(playerName: string, msg: string) {
  sendRawtext(playerName, [{ text: msg }]);
}

export function clamp(val: number, min: number, max: number) {
  return Math.max(Math.min(val, max), min);
}

export function getTags(selector: string): string[] {
  const response = runCommand(`tag ${selector} list`).result;
  if (!response.statusMessage.includes('has no tags')) {
    let tags = response.statusMessage.split(' tags: ')[1].split(/§r, §a/g);
    return tags;
  }
  return [];
}

export function runCommand(command: string) {
  try {
    return { result: Commands.run(command), error: false };
  } catch (err) {
    return { result: err, error: true };
  }
}

export function runCommands(commands: string[]) {
  for (let command of commands) {
    try {
      runCommand(command);
    } catch (err) {}
  }
}

let tickTimeouts: { func: () => void; ticks: number }[] = [];
export function setTickTimeout(call: () => void, ticks: number) {
  const timeout = { ticks: ticks, func: call };
  tickTimeouts.push(timeout);
  return timeout;
}

let tickIntervals: { func: () => void; ticks: number }[] = [];
export function setTickInterval(call: () => void, ticks: number) {
  const interval = { ticks: ticks, func: call };
  tickTimeouts.push(interval);
  return interval;
}

export function clearTickInterval(tickInterval: { func: () => void; ticks: number }) {
  for (let i = tickIntervals.length - 1; i <= 0; i--) {
    let v = tickIntervals[i];
    if (v == tickInterval) {
      tickIntervals.splice(i);
    }
  }
}

const playerIdObjective = new Scoreboard('playerId');
export let playerClassToId = new Map<Player, string>();

Events.on('tick', (evd) => {
  for (let i = tickTimeouts.length - 1; i <= 0; i--) {
    let v = tickTimeouts[i];
    if (!v) break;
    v.ticks--;
    if (v.ticks <= 0) {
      v.func();
      tickTimeouts.splice(i);
    }
  }
  for (let i = tickIntervals.length - 1; i <= 0; i--) {
    let v = tickIntervals[i];
    if (!v) break;
    if (evd.tickStamp % v.ticks == 0) {
      v.func();
    }
  }

  for (let player of World.getPlayers()) {
    if (!player.name) continue;
    if (playerClassToId.has(player)) {
      continue;
    }
    let id = playerIdObjective.getScoreSelector(`"${player.name}"`);
    if (!id) {
      continue;
    }
    playerClassToId.set(player, id + '');
  }
});
