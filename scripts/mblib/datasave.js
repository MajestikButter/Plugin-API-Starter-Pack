import { runCommand } from './utils/runcommand.js';
import { setTickInterval } from './utils/ticktimeouts.js';
import Scoreboard from './scoreboard.js';
export let dataSaves = {};
let dataSaveObjective = new Scoreboard('dataSaves');
function getDataSavePlayers() {
    let cmd = runCommand(`scoreboard players list`);
    if (cmd.error)
        return [];
    let trackedPlayers = cmd.result.statusMessage.split('\n')[1].split(', ');
    let getDataSaves = [];
    for (let trackedPlayer of trackedPlayers) {
        if (!trackedPlayer.startsWith('$DataSave:'))
            continue;
        getDataSaves.push({ raw: trackedPlayer, parsed: JSON.parse(trackedPlayer.slice(10).replace(/\\\"/g, '"')) });
    }
    return getDataSaves;
}
export default class DataSave {
    constructor(id, data, autoSave = true) {
        this.autoSave = true;
        this.id = id;
        this.data = data;
        this.autoSave = autoSave;
    }
    save() {
        let scoreDataSaves = getDataSavePlayers();
        for (let dataSave of scoreDataSaves) {
            if (dataSave.parsed.id == this.id) {
                dataSaveObjective.setScoreSelector(`"${dataSave.raw}"`, 'none');
            }
        }
        let thisStr = JSON.stringify(JSON.stringify(this));
        dataSaveObjective.setScoreSelector(`"$DataSave:${thisStr.slice(1, thisStr.length - 1)}"`, 0);
    }
    static get(id, defaultData = {}) {
        if (dataSaves[id]) {
            return dataSaves[id];
        }
        else {
            let dataSave = new DataSave(id, defaultData);
            dataSaves[id] = dataSave;
            return dataSave;
        }
    }
}
let loadDataSaves = getDataSavePlayers();
for (let trackedPlayer of loadDataSaves) {
    dataSaves[trackedPlayer.parsed.id] = DataSave.get(trackedPlayer.parsed.id, trackedPlayer.parsed.data);
}
setTickInterval(() => {
    for (let k in dataSaves) {
        let dataSave = dataSaves[k];
        dataSave.save();
    }
}, 100);
