import Events from './events.js';
import { getTags, runCommand, setTickInterval } from './general.js';
let dataSaves = {};
const dataSaveSelector = (id) => `@e[c=1,type=plugin:datasave,name="${id}"]`;
class DataSave {
    constructor(id, autoSave = true) {
        this.autoSave = true;
        this.id = id;
        this.autoSave = autoSave;
        if (runCommand(`testfor ${dataSaveSelector(this.id)}`).error) {
            runCommand(`summon plugin:datasave ${this.id} 0 1 0`);
            this.data = {};
        }
        else {
            this.data = JSON.parse(getTags(dataSaveSelector(this.id))[0]);
        }
    }
    save() {
        const tags = getTags(dataSaveSelector(this.id));
        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            runCommand(`tag @e remove ${JSON.stringify(tag)}`);
        }
        runCommand(`tag ${dataSaveSelector(this.id)} add ${JSON.stringify(JSON.stringify(this.data))}`);
    }
    static create(id, autoSave = true) {
        return new Promise((resolve, reject) => {
            Events.on('worldStarted', () => {
                if (dataSaves[id]) {
                    reject(new Error('A DataSave with that ID already exists'));
                }
                else {
                    let dataSave = new DataSave(id, autoSave);
                    dataSaves[id] = dataSave;
                    resolve(dataSave);
                }
            });
        });
    }
}
export default DataSave;
setTickInterval(() => {
    for (let k in dataSaves) {
        let dataSave = dataSaves[k];
        dataSave.save();
    }
}, 600);
