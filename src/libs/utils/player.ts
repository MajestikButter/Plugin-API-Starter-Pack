import { runCommand } from './runcommand.js';

export function getPlayerNames() {
  let testfor = runCommand('testfor @a');
  if (testfor.error) return [];
  let currParsed = [];
  if (!testfor.result.statusMessage.includes(', ')) {
    currParsed = [testfor.result.statusMessage.slice(6)];
  } else {
    currParsed = testfor.result.statusMessage.slice(6).split(/, /g);
  }
  return currParsed;
}

export const selectorFromPlayerId = (playerId: string | number) => `@a[scores={playerId=${playerId}}]`;
