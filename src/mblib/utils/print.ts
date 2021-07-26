import { runCommand } from "./runcommand.js";

export function print(msg: string) {
  runCommand('say §r' + msg);
}

export function error(err: string) {
  print(`§c${err}`);
}
