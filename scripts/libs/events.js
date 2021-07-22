import { World } from 'Minecraft';
import EventEmitter from './eventemitter.js';
import Scoreboard from './scoreboard.js';
import { runCommand } from './utils/runcommand.js';
let Events = new EventEmitter();
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
    if (playerIdObjective.getScoreSelector('"#id"') === 'none') {
        playerIdObjective.setScoreSelector('"#id"', -2147483648);
    }
    playerIdObjective.addScoreSelector('@a', 0);
    let setPlayer = playerIdObjective.setScoreSelector('@p[scores={playerId=0}]', playerIdObjective.getScoreSelector('"#id"'));
    if (setPlayer)
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
    if (runCommand('testfor @p').error)
        return;
    let pluginManagerExists = !runCommand('testfor @e[type=plugin:manager]').error;
    if (!pluginManagerExists) {
        runCommand('execute @r ~~~ tickingarea add 0 0 0 0 0 0 plugin_ticking');
        runCommand('execute @r ~~~ summon plugin:manager 0 1 0');
    }
    else {
        if (!startedUp) {
            Events.emit('worldStarted', {
                tickStamp: tickStamp
            });
            startedUp = true;
        }
    }
});
let prevTestfor = [];
Events.on('tick', () => {
    let testfor = runCommand('testfor @a');
    if (testfor.error)
        return;
    let currParsed = [];
    if (!testfor.result.statusMessage.includes(', ')) {
        currParsed = [testfor.result.statusMessage.slice(6)];
    }
    else {
        currParsed = testfor.result.statusMessage.slice(6).split(/, /g);
    }
    for (let name of currParsed) {
        if (prevTestfor.includes(name))
            continue;
        let players = World.getPlayers();
        for (let player of players) {
            if (!player.name)
                continue;
            if (player.name == name) {
                let evd = { player: player, playerId: playerIdObjective.getScoreSelector(`"${player.name}"`) + '' };
                Events.emit('playerCreated', evd);
                break;
            }
        }
    }
    for (let name of prevTestfor) {
        if (currParsed.includes(name))
            continue;
        let evd = { playerName: name };
        Events.emit('playerRemoved', evd);
    }
    prevTestfor = currParsed;
});
