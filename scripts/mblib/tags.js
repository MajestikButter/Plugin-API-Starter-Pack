import { runCommand } from './utils/runcommand.js';
export class Tags {
    constructor(selector) {
        this.selector = selector;
    }
    getAll() {
        const response = runCommand(`tag ${this.selector} list`).result;
        if (response.error)
            return [];
        if (!response.statusMessage.includes('has no tags')) {
            let tags = response.statusMessage.split(' tags: §a')[1];
            tags = tags
                .slice(0, tags.length - 2)
                .replace(/\$\(SS\)\$/g, '§')
                .split('§r, §a');
            return tags;
        }
        return [];
    }
    add(tag) {
        runCommand(`tag ${this.selector} add ${JSON.stringify(tag).replace(/§/g, '$(SS)$')}`);
    }
    remove(tag) {
        runCommand(`tag ${this.selector} remove ${JSON.stringify(tag).replace(/§/g, '$(SS)$')}`);
    }
    removeAll() {
        let tags = this.getAll();
        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            this.remove(tag);
        }
    }
}
