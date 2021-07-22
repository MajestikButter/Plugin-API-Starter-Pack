import { runCommand } from './runcommand.js';
export function sendRawtext(selector, JSONArr) {
    runCommand(`tellraw ${selector} { "rawtext": ${JSON.stringify(JSONArr)} }`);
}
export function sendMsg(selector, msg) {
    this.sendRawtext(selector, [{ text: msg }]);
}
