import Events from './events.js';
import { runCommand } from './utils/runcommand.js';
import { setTickInterval } from './utils/ticktimeouts.js';
import { Tags } from './tags.js';
import { print } from './utils/print.js';

let dataSaves: { [id: string]: DataSave } = {};

const dataSaveSelector = (id: string) => `@e[c=1,type=plugin:datasave,name="${id}"]`;

class DataSave {
  id: string;
  data: any;
  autoSave: boolean = true;

  save() {
    const tags = new Tags(dataSaveSelector(this.id));
    tags.removeAll();
    tags.add(JSON.stringify(this.data));
  }

  static create(id: string, autoSave = true): Promise<DataSave> {
    return new Promise((resolve, reject) => {
      Events.on('worldStarted', () => {
        if (dataSaves[id]) {
          resolve(dataSaves[id]);
        } else {
          let dataSave = new DataSave(id, autoSave);
          dataSaves[id] = dataSave;

          if (runCommand(`testfor ${dataSaveSelector(id)}`).error) {
            runCommand(`execute @r ~~~ summon plugin:datasave "${id}" 0 1 0`);
            dataSave.data = {};
          } else {
            const tags = new Tags(dataSaveSelector(id));
            dataSave.data = JSON.parse(tags.getAll()[0]);
          }

          resolve(dataSave);
        }
      });
    });
  }

  private constructor(id: string, autoSave = true) {
    this.id = id;
    this.autoSave = autoSave;

    if (runCommand(`testfor ${dataSaveSelector(this.id)}`).error) {
      runCommand(`summon plugin:datasave ${this.id} 0 1 0`);
      this.data = {};
    } else {
      const tags = new Tags(dataSaveSelector(this.id));
      this.data = JSON.parse(tags.getAll()[0]);
    }
  }
}
export default DataSave;

setTickInterval(() => {
  for (let k in dataSaves) {
    let dataSave = dataSaves[k];
    dataSave.save();
  }
}, 100);
