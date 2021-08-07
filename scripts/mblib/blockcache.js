import { BlockLocation, World } from 'Minecraft';
export class BlockCache {
    static get(x, y, z) {
        let locArray = [x, y, z];
        return this.getArr(locArray);
    }
    static getArr(locArray) {
        locArray = [Math.trunc(locArray[0]), Math.trunc(locArray[1]), Math.trunc(locArray[2])];
        let cachedBlock = this.blocks.find((v) => locArray[0] === v.locArray[0] && locArray[1] === v.locArray[1] && locArray[2] === v.locArray[2]);
        if (cachedBlock)
            return cachedBlock;
        let loc = new BlockLocation(locArray[0], locArray[1], locArray[2]);
        cachedBlock = {
            block: World.getDimension('overworld').getBlock(loc),
            locArray: locArray,
            location: loc
        };
        this.blocks.push(cachedBlock);
        return cachedBlock;
    }
}
BlockCache.blocks = [];
