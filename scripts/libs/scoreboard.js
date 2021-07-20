import { runCommand } from "./general.js";
export default class Scoreboard {
    constructor(name, displayName) {
        this.name = name;
        if (displayName) {
            runCommand(`scoreboard objectives add ${name} dummy ${displayName}`);
        }
        else
            runCommand(`scoreboard objectives add ${name} dummy`);
    }
    getScoreSelector(selector) {
        let response = runCommand(`scoreboard players test ${selector} ${this.name} * *`);
        if (response.error)
            return 0;
        return parseInt(response.result.statusMessage.replace('Score ', '').replace(' is in range -2147483648 to 2147483647', ''));
    }
    getScore(entityName) {
        return this.getScoreSelector(`@e[c=1,name="${entityName}"]`);
    }
    setScoreSelector(selector, score) {
        runCommand(`scoreboard players set ${selector} ${this.name} ${score}`);
    }
    setScore(entityName, score) {
        this.setScoreSelector(`@e[c=1,name="${entityName}"]`, score);
    }
    addScoreSelector(selector, score) {
        runCommand(`scoreboard players add ${selector} ${this.name} ${score}`);
    }
    addScore(entityName, score) {
        this.addScoreSelector(`@e[c=1,name="${entityName}"]`, score);
    }
}
