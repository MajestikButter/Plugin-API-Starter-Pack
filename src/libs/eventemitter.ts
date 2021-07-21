type EventListener = {
  eventName: string;
  callback: (...args: any[]) => any;
  type: 'once' | 'always';
};
export default class EventEmitter {
  private events: {
    [event: string]: {
      listeners: EventListener[];
    };
  } = {};

  private addListener(eventName: string, eventCallback: (...args: any[]) => any, type: 'once' | 'always') {
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
    } else {
      event.listeners.push({
        eventName: eventName,
        callback: eventCallback,
        type: type
      });
    }
    this.events[eventName] = event;
  }

  private removeListener(listener: EventListener) {
    let event = this.events[listener.eventName];
    const index = event.listeners.indexOf(listener);
    if (index < 0) return;

    event.listeners.splice(index);
  }

  listeners(eventName: string) {
    let event = this.events[eventName];
    if (!event) return [];
    return event.listeners;
  }

  on(eventName: string, eventCallback: (...args: any[]) => any) {
    this.addListener(eventName, eventCallback, 'always');
  }

  once(eventName: string, eventCallback: (...args: any[]) => any) {
    this.addListener(eventName, eventCallback, 'once');
  }

  emit(eventName: string, ...args: any[]) {
    let event = this.events[eventName];
    if (!event) {
      return;
    }

    for (let i = event.listeners.length - 1; i >= 0; i--) {
      let listener = event.listeners[i];
      listener.callback(...args);

      if (listener.type == 'once') {
        this.removeListener(listener);
      }
    }
  }
}
