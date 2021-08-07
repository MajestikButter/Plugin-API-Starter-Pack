import { runCommand } from './runcommand.js';
export function print(msg, header = '§r[Info]') {
    if (typeof msg === 'undefined')
        msg = 'undefined';
    if (typeof msg !== 'string')
        msg = JSON.stringify(msg);
    msg = JSON.stringify(msg);
    runCommand(`tellraw @a[tag=devMode] {"rawtext": [{"text":"§b[Dev Log] ${header} ${msg.slice(1, msg.length - 1)}"}]}`);
}
export function error(err) {
    if (err.name)
        return print(`${err.name}: ${err.message}`, '§c[Error]');
    print(err, '§c[Error]');
}
