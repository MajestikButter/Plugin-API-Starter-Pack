import EventEmitter from './eventemitter.js';
import { BeforeChatEVD } from './events.js';
import { runCommand } from './utils/runcommand.js';
import { sendMsg } from './utils/sendmessage.js';

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
  static prefix = '!';
  static enabled = true;

  static commands: ChatCommand[] = [];

  static register(name: string, description: string, usage: string, permission: string[], callback: ChatCommandCallback) {
    this.eventEmitter.on(name, callback);
    let newCommand = new ChatCommand(name, description, usage, permission, callback);
    this.commands.push(newCommand);
  }

  static isCmd(msg: string) {
    return msg.startsWith(this.prefix);
  }

  static run(evd: BeforeChatEVD) {
    const msg = evd.message.slice(this.prefix.length);
    const cmd = msg.split(' ')[0];
    const argsMsg = msg.slice(cmd.length).trim();
    const args = argsMsg.split(' ');

    if (this.eventEmitter.listeners(cmd).length <= 0) {
      runCommand(`tellraw @p[name="${evd.sender.name}"] {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["${cmd}"]}]}`);
      return;
    }

    this.eventEmitter.emit(cmd, evd, args, argsMsg);
  }
}

ChatCommands.register('help', 'Provides help/list of commands.', 'help [page: int]', ['basic', 'help'], (msg, args) => {
  let body = '';
  let page = 1;
  if (args[0]) page = Math.max(parseInt(args[0]), 1);

  let cmdsOnPage = 0;
  let validCmds = 0;
  for (let i = 0; i < ChatCommands.commands.length; i++) {
    let cmd = ChatCommands.commands[i];
    validCmds++;

    if (validCmds <= page * 7 - 7 || cmdsOnPage >= 7) continue;
    cmdsOnPage++;
    body += `!${cmd.usage}\n - ${cmd.description}\n`;
  }

  const header = `§2--- Showing help page ${page} of ${Math.ceil(validCmds / 7)} (!help [page]) ---§r\n`;
  sendMsg(`"${msg.sender.name}"`, header + body + header);
});
