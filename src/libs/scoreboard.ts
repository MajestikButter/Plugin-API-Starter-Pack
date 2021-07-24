import { runCommand } from './utils/runcommand.js';

export default class Scoreboard {
  name: string;
  constructor(name: string, displayName?: string) {
    this.name = name;

    if (displayName) {
      runCommand(`scoreboard objectives add ${name} dummy ${displayName}`);
    } else runCommand(`scoreboard objectives add ${name} dummy`);
  }

  getScoreSelector(selector: string) {
    let response = runCommand(`scoreboard players test ${selector} ${this.name} * *`);
    if (response.error) return 'none';
    return parseInt(response.result.statusMessage.replace('Score ', '').replace(' is in range -2147483648 to 2147483647', ''));
  }

  getScore(entityName: string) {
    return this.getScoreSelector(`@e[c=1,name="${entityName}"]`);
  }

  setScoreSelector(selector: string, score: number | 'none') {
    if (typeof score != 'number' && score != 'none') return false;
    if (score === 'none') return !runCommand(`scoreboard players reset ${selector} ${this.name}`).error;
    return !runCommand(`scoreboard players set ${selector} ${this.name} ${score}`).error;
  }

  setScore(entityName: string, score: number | 'none') {
    return this.setScoreSelector(`@e[c=1,name="${entityName}"]`, score);
  }

  addScoreSelector(selector: string, score: number | 'none') {
    if (typeof score != 'number') return false;
    return !runCommand(`scoreboard players add ${selector} ${this.name} ${score}`).error;
  }

  addScore(entityName: string, score: number | 'none') {
    return this.addScoreSelector(`@e[c=1,name="${entityName}"]`, score);
  }
}
