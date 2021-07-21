import { runCommand } from './runcommand.js';

type rawtextEntry = { text: string } | { translate: string; with?: string[] } | { score: { objective: string; name: string } } | { selector: string };
export function sendRawtext(selector: string, JSONArr: rawtextEntry[]) {
  runCommand(`tellraw ${selector} { "rawtext": ${JSON.stringify(JSONArr)} }`);
}

export function sendMsg(selector: string, msg: string) {
  this.sendRawtext(selector, [{ text: msg }]);
}
