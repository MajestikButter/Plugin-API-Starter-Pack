import { ChatEvent, Commands, Player, World } from 'Minecraft';
import EventEmitter from './eventemitter.js';
import Events, { BeforeChatEVD } from './events.js';
import { runCommand } from './utils/runcommand.js';

type ChatCommandCallback = (msg?: BeforeChatEVD, args?: string[], argStr?: string) => any;
class ChatCommand {
  name: string;
  description: string;
  usage: string;
  permission: string[];
  callback: ChatCommandCallback;

  constructor(name: string, description: string, usage: string, permission: string[], callback: ChatCommandCallback) {
    this.name = name;
    this.description = description;
    this.usage = usage;
    this.permission = permission;
    this.callback = callback;
  }
}

export class ChatCommands {
  static eventEmitter = new EventEmitter();

  static commands: ChatCommand[] = [];

  static register(name: string, description: string, usage: string, permission: string[], callback: ChatCommandCallback) {
    this.eventEmitter.on(name, callback);
    let newCommand = new ChatCommand(name, description, usage, permission, callback);
    this.commands.push(newCommand);
  }

  static run(evd: BeforeChatEVD) {
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
