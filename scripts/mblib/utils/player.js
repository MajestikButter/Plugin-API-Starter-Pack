import { World } from 'Minecraft';
import Scoreboard from '../scoreboard.js';
import { runCommand } from './runcommand.js';
export function getPlayerNames() {
    let testfor = runCommand('testfor @a');
    if (testfor.error)
        return [];
    let currParsed = [];
    if (!testfor.result.statusMessage.includes(', ')) {
        currParsed = [testfor.result.statusMessage.slice(6)];
    }
    else {
        currParsed = testfor.result.statusMessage.slice(6).split(/, /g);
    }
    return currParsed.sort();
}
export const selectorFromPlayerId = (playerId, additionalArgs = []) => `@a[scores={playerId=${playerId}}${additionalArgs.length > 0 ? ',' + additionalArgs.toString() : ''}]`;
const playerIdObjective = new Scoreboard('playerId');
export const getPlayerFromId = (playerId) => World.getPlayers().find((v) => playerIdObjective.getScoreSelector(`"${v.nameTag}"`) === parseInt(playerId));
