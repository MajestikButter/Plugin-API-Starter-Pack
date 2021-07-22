import Events from "../events.js";
import Scoreboard from "../scoreboard.js";
let tickTimeoutId = 0;
let tickTimeouts = [];
export function setTickTimeout(call, ticks) {
    const timeout = { ticks: ticks, func: call };
    const id = tickTimeoutId;
    tickTimeouts[tickTimeoutId] = timeout;
    tickTimeoutId++;
    return id;
}
let tickIntervalId = 0;
let tickIntervals = [];
export function setTickInterval(call, ticks) {
    const interval = { ticks: ticks, ticking: ticks, func: call };
    const id = tickIntervalId;
    tickIntervals[tickIntervalId] = interval;
    tickIntervalId++;
    return id;
}
export function clearTickInterval(tickIntervalId) {
    delete tickIntervals[tickIntervalId];
}
const playerIdObjective = new Scoreboard('playerId');
Events.on('worldStarted', () => Events.on('tick', (evd) => {
    for (let k in tickTimeouts) {
        let v = tickTimeouts[k];
        if (!v)
            break;
        v.ticks--;
        if (v.ticks <= 0) {
            v.func();
            delete tickTimeouts[k];
        }
    }
    for (let k in tickIntervals) {
        let v = tickIntervals[k];
        if (!v)
            break;
        v.ticking--;
        if (v.ticking <= 0) {
            v.ticking = v.ticks;
            v.func();
        }
    }
}));
