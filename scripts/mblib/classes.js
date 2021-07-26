import EventEmitter from './eventemitter.js';
import { runCommand } from './utils/runcommand.js';
class ChatCommand {
    constructor(name, description, usage, permission, callback) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.permission = permission;
        this.callback = callback;
    }
}
export class ChatCommands {
    static register(name, description, usage, permission, callback) {
        this.eventEmitter.on(name, callback);
        let newCommand = new ChatCommand(name, description, usage, permission, callback);
        this.commands.push(newCommand);
    }
    static run(evd) {
        const msg = evd.message.slice(1);
        const cmd = msg.split(' ')[0];
        const argsMsg = msg.slice(cmd.length).trim();
        const args = argsMsg.split(' ');
        if (this.eventEmitter.listeners(cmd).length <= 0) {
            runCommand(`tellraw @p[name="${evd.sender.nameTag}"] {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["${cmd}"]}]}`);
            return;
        }
        this.eventEmitter.emit(cmd, evd, args, argsMsg);
    }
}
ChatCommands.eventEmitter = new EventEmitter();
ChatCommands.commands = [];
