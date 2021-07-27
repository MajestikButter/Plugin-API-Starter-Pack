import { error } from './utils/print.js';
export default class EventEmitter {
    constructor() {
        this.events = {};
    }
    addListener(eventName, eventCallback, type) {
        let event = this.events[eventName];
        if (!event) {
            event = {
                listeners: [
                    {
                        eventName: eventName,
                        callback: eventCallback,
                        type: type
                    }
                ]
            };
        }
        else {
            event.listeners.push({
                eventName: eventName,
                callback: eventCallback,
                type: type
            });
        }
        this.events[eventName] = event;
    }
    removeListener(listener) {
        let event = this.events[listener.eventName];
        const index = event.listeners.indexOf(listener);
        if (index < 0)
            return;
        event.listeners.splice(index);
    }
    listeners(eventName) {
        let event = this.events[eventName];
        if (!event)
            return [];
        return event.listeners;
    }
    on(eventName, eventCallback) {
        this.addListener(eventName, eventCallback, 'always');
    }
    once(eventName, eventCallback) {
        this.addListener(eventName, eventCallback, 'once');
    }
    emit(eventName, ...args) {
        try {
            let event = this.events[eventName];
            if (!event) {
                return;
            }
            for (let i = 0; i < event.listeners.length; i++) {
                try {
                    let listener = event.listeners[i];
                    listener.callback(...args);
                }
                catch (err) {
                    error(err);
                }
            }
            for (let i = event.listeners.length - 1; i >= 0; i--) {
                let listener = event.listeners[i];
                if (listener.type == 'once') {
                    this.removeListener(listener);
                }
            }
        }
        catch (err) {
            error(err);
        }
    }
}
