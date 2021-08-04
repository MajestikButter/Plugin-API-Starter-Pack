import { runCommand } from './runcommand.js';

export function getPlayerNames() {
  let testfor = runCommand('testfor @a');
  if (testfor.error) return [];
  let currParsed: string[] = [];
  if (!testfor.result.statusMessage.includes(', ')) {
    currParsed = [testfor.result.statusMessage.slice(6)];
  } else {
    currParsed = testfor.result.statusMessage.slice(6).split(/, /g);
  }
  return currParsed.sort();
}

export const selectorFromPlayerId = (playerId: string | number, additionalArgs: string[] = []) =>
  `@a[scores={playerId=${playerId}}${additionalArgs.length > 0 ? ','+additionalArgs.toString() : ''}]`;
