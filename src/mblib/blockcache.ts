import { Block, BlockLocation, World } from 'Minecraft';
import { print } from './utils/print.js';

export interface CachedBlock {
  block: Block;
  location: BlockLocation;
  locArray: [number, number, number];
}
export class BlockCache {
  static blocks: CachedBlock[] = [];

  static get(x: number, y: number, z: number) {
    let locArray: [number, number, number] = [x, y, z];
    return this.getArr(locArray);
  }
  static getArr(locArray: [number, number, number]) {
    locArray = [Math.trunc(locArray[0]), Math.trunc(locArray[1]), Math.trunc(locArray[2])];
    
    let cachedBlock = this.blocks.find((v) => locArray[0] === v.locArray[0] && locArray[1] === v.locArray[1] && locArray[2] === v.locArray[2]);
    if (cachedBlock) return cachedBlock;

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
