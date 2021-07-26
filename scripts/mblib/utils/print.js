import { runCommand } from "./runcommand.js";
export function print(msg) {
    runCommand('say §r' + msg);
}
export function error(err) {
    print(`§c${err}`);
}
