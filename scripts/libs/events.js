import { World } from 'Minecraft';
import EventEmitter from './eventlistener.js';
import { playerClassToId, runCommand } from './general.js';
let Events = new EventEmitter();
export default Events;
World.events.chat.subscribe((evd) => {
    let senderId = playerClassToId.get(evd.sender);
    let emitEvd = {
        senderId: senderId,
        message: evd.message
    };
    Events.emit('chat', emitEvd);
});
World.events.beforeChat.subscribe((evd) => {
    let senderId = playerClassToId.get(evd.sender);
    let emitEvd = {
        senderId: senderId,
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
let tickStamp = 0;
World.events.tick.subscribe(() => {
    let emitEvd = {
        tickStamp: tickStamp
    };
    Events.emit('tick', emitEvd);
    tickStamp++;
});
let startedUp = false;
Events.on('tick', (evd) => {
    runCommand('tickingarea add 0 0 0 0 0 0 plugin_ticking');
    let pluginManagerExists = !runCommand('testfor @e[type=plugin:manager]').error;
    if (!pluginManagerExists) {
        runCommand('summon plugin:manager');
    }
    else {
        if (!startedUp) {
            Events.emit('worldStarted', {
                tickStamp: evd.tickStamp
            });
        }
    }
});
