import Events from '../events.js';
import Scoreboard from '../scoreboard.js';

let tickTimeoutId = 0;
let tickTimeouts: { [id: number]: { func: () => void; ticks: number } } = [];
export function setTickTimeout(call: () => void, ticks: number) {
  const timeout = { ticks: ticks, func: call };
  const id = tickTimeoutId;
  tickTimeouts[tickTimeoutId] = timeout;
  tickTimeoutId++;
  return id;
}

let tickIntervalId = 0;
let tickIntervals: { [id: number]: { func: () => void; ticks: number; ticking: number } } = [];
export function setTickInterval(call: () => void, ticks: number) {
  const interval = { ticks: ticks, ticking: ticks, func: call };
  const id = tickIntervalId;
  tickIntervals[tickIntervalId] = interval;
  tickIntervalId++;
  return id;
}

export function clearTickInterval(tickIntervalId: number) {
  delete tickIntervals[tickIntervalId];
}

const playerIdObjective = new Scoreboard('playerId');

Events.on('worldStarted', () =>
  Events.on('tick', (evd) => {
    for (let k in tickTimeouts) {
      let v = tickTimeouts[k];
      if (!v) break;
      v.ticks--;
      if (v.ticks <= 0) {
        try {
          v.func();
        } catch {}
        delete tickTimeouts[k];
      }
    }

    for (let k in tickIntervals) {
      let v = tickIntervals[k];
      if (!v) break;
      v.ticking--;
      if (v.ticking <= 0) {
        v.ticking = v.ticks;
        try {
          v.func();
        } catch {}
      }
    }
  })
);
