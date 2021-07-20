import * as Minecraft from "Minecraft";
declare module "GameTest" {
  /* @module GameTest */
  /** 
   * A utility class to set GameTest parameters for a test
  * @public
  */
  export class RegistrationBuilder {
    
  /**
    * @remarks
    * Sets the batch for the test to run in
    *
    * @param batchName Name of the batch for the test
    *
    *
    */
  batch(batchName: ('night'|'day')): RegistrationBuilder;
  /**
    *
    * @param isRequired 
    *
    *
    */
  required(isRequired: boolean): RegistrationBuilder;
  /**
    * @remarks
    * Sets the number of successful test runs to be considered successful
    *
    * @param attemptCount 
    *
    *
    */
  requiredSuccessfulAttempts(attemptCount: number): RegistrationBuilder;
  /**
    * @remarks
    * Sets the maximum number of times a test will try to rerun if it fails
    *
    * @param attemptCount 
    *
    *
    */
  maxAttempts(attemptCount: number): RegistrationBuilder;
  /**
    * @remarks
    * Sets the maximum number of ticks a test will run for before timing out and failing
    *
    * @param tickCount 
    *
    *
    */
  maxTicks(tickCount: number): RegistrationBuilder;
  /**
    * @remarks
    * Sets the number of ticks for a test to wait before executing when the structure is spawned
    *
    * @param tickCount 
    *
    *
    */
  setupTicks(tickCount: number): RegistrationBuilder;
  /**
    * @remarks
    * Sets the name of the structure for a test to use. "xyz:bar" will load `/structures/xyz/bar.mcstructure` from the behavior pack stack.
    *
    * @param structureName 
    *
    *
    */
  structureName(structureName: string): RegistrationBuilder;
  /**
    *
    * @param paddingBlocks 
    *
    *
    */
  padding(paddingBlocks: number): RegistrationBuilder;
  /**
    * @remarks
    * Adds a tag to a test. You can run all tests with a given tag with `/gametest runall <tag>`
    *
    * @param tag 
    *
    *
    */
  tag(tag: string): RegistrationBuilder;
  }
  
  /** 
  * @public
  */
  export class Helper {
    
  /**
    *
    * @param blockType 
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  assertBlockTypeNotPresent(blockType: Minecraft.BlockType, location: Minecraft.BlockLocation): void;
  /**
    *
    * @param blockType 
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  assertBlockTypePresent(blockType: Minecraft.BlockType, location: Minecraft.BlockLocation): void;
  /**
    * @remarks
    * Tests that a block has a particular state value at the specified location. If it does not have that state value, an exception is thrown.
    *
    * @param blockStateName Name of the block state to test.
    * @param stateValue Expected state value.
    * @param location 
    *
    *
    * @throws This function can throw errors.
    * @example testIfButtonNotPressed.js
    * ```typescript
    *    test.assertBlockState("button_pressed_bit", 0, buttonPos);
    *    
    * ```
    */
  assertBlockState(blockStateName: string, stateValue: number, location: Minecraft.BlockLocation): void;
  /**
    * @remarks
    * Tests that the condition specified in _condition_ is true. If not, an error with the specified _message_ is thrown.
    *
    * @param condition Expression of the condition to evaluate.
    * @param message Message that is passed if the _condition_ does not evaluate to true.
    *
    *
    * @throws This function can throw errors.
    */
  assert(condition: boolean, message: string): void;
  /**
    * @remarks
    * Tests that a container (e.g., a chest) at the specified location contains a specified of item stack. If not, an error is thrown.
    *
    * @param itemStack Represents the type of item to check for. The specified container must contain at least 1 item matching the item type defined in _itemStack_.
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  assertContainerContains(itemStack: Minecraft.ItemStack, location: Minecraft.BlockLocation): void;
  /**
    * @remarks
    * Tests that a container (e.g., a chest) at the specified location is empty. If not, an error is thrown.
    *
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  assertContainerEmpty(location: Minecraft.BlockLocation): void;
  /**
    * @remarks
    * Tests that an entity (e.g., a skeleton) at the specified location has a particular piece of data. If not, an error is thrown.
    *
    * @param location 
    * @param entityIdentifier Identifier of the entity (e.g., 'minecraft:skeleton') to look for. Note if no namespace is specified, 'minecraft:' is assumed.
    * @param callback Callback function where facets of the selected entity can be tested for. If this callback function returns false or no entity with the specified identifier is found, an exception is thrown.
    *
    *
    * @throws This function can throw errors.
    * @example villagerEffectTest.js
    * ```typescript
    *    test.assertEntityData(
    *      villagerPos,
    *      "minecraft:villager",
    *      (entity) => entity.getEffect(Effects.regeneration).getDuration() > 120
    *    ); // At least 6 seconds remaining in the villagers' effect
    *    
    * ```
    */
  assertEntityData(location: Minecraft.BlockLocation, entityIdentifier: string, callback: (arg0: Minecraft.Entity) => boolean): void;
  /**
    * @remarks
    * Tests that an entity has a specific piece of armor equipped. If not, an error is thrown.
    *
    * @param entityIdentifier Identifier of the entity to match (e.g., 'minecraft:skeleton').
    * @param armorSlot Container slot index to test.
    * @param armorName Name of the armor to look for.
    * @param armorData 
    * @param location 
    * @param hasArmor Whether or not the entity is expected to have the specified armor equipped.
    *
    *
    * @throws This function can throw errors.
    * @example horseArmorTest.js
    * ```typescript
    *    test.assertEntityHasArmor("minecraft:horse", armorSlotTorso, "diamond_horse_armor", 0, horseLocation, true);
    *    
    * ```
    */
  assertEntityHasArmor(entityIdentifier: string, armorSlot: number, armorName: string, armorData: number, location: Minecraft.BlockLocation, hasArmor: boolean): void;
  /**
    * @remarks
    * Tests that an entity has a particular component. If not, an exception is thrown.
    *
    * @param entityIdentifier Identifier of the specified entity (e.g., 'minecraft:skeleton'). If the namespace is not specified, 'minecraft:' is assumed.
    * @param componentIdentifier Identifier of the component to check for. If the namespace is not specified, 'minecraft:' is assumed.
    * @param location 
    * @param hasComponent Determines whether to test that the component exists, or does not.
    *
    *
    * @throws This function can throw errors.
    * @example sheepShearedTest.js
    * ```typescript
    *    test.assertEntityHasComponent("minecraft:sheep", "minecraft:is_sheared", entityLoc, false);
    *    
    * ```
    */
  assertEntityHasComponent(entityIdentifier: string, componentIdentifier: string, location: Minecraft.BlockLocation, hasComponent: boolean): void;
  /**
    * @remarks
    * Tests that a particular entity is still present and alive within the GameTest area. If not, an error is thrown.
    *
    * @param entity Specific entity to test for.
    *
    *
    * @throws This function can throw errors.
    */
  assertEntityInstancePresent(entity: Minecraft.Entity): void;
  /**
    * @remarks
    * Tests that an entity of a specified type is not present at a specified location. If it is, an exception is thrown.
    *
    * @param entityIdentifier Type of entity to test for (e.g., 'minecraft:skeleton'). If an entity namespace is not specified, 'minecraft:' is assumed.
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  assertEntityNotPresent(entityIdentifier: string, location: Minecraft.BlockLocation): void;
  /**
    * @remarks
    * Tests that an entity of a specified type is not present within the GameTest area. If not, an exception is thrown.
    *
    * @param entityIdentifier Type of entity to test for (e.g., 'minecraft:skeleton'). If an entity namespace is not specified, 'minecraft:' is assumed.
    *
    *
    * @throws This function can throw errors.
    */
  assertEntityNotPresentInArea(entityIdentifier: string): void;
  /**
    * @remarks
    * Tests that an entity of a specified type is not touching or connected to another entity. If it is, an exception is thrown.
    *
    * @param entityIdentifier Type of entity to test for (e.g., 'minecraft:skeleton'). If an entity namespace is not specified, 'minecraft:' is assumed.
    * @param position Location of the entity to test for.
    *
    *
    * @throws This function can throw errors.
    */
  assertEntityNotTouching(entityIdentifier: string, position: Minecraft.Location): void;
  /**
    * @remarks
    * Tests that an entity of a specified type is present at a particular location. If not, an exception is thrown.
    *
    * @param entityIdentifier Type of entity to test for (e.g., 'minecraft:skeleton'). If an entity namespace is not specified, 'minecraft:' is assumed.
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  assertEntityPresent(entityIdentifier: string, location: Minecraft.BlockLocation): void;
  /**
    * @remarks
    * Tests that an entity of a specified type is present within the GameTest area. If not, an exception is thrown.
    *
    * @param entityIdentifier Type of entity to test for (e.g., 'minecraft:skeleton'). If an entity namespace is not specified, 'minecraft:' is assumed.
    *
    *
    * @throws This function can throw errors.
    */
  assertEntityPresentInArea(entityIdentifier: string): void;
  /**
    * @remarks
    * Tests that an entity of a specified type is touching or connected to another entity. If not, an exception is thrown.
    *
    * @param entityIdentifier Type of entity to test for (e.g., 'minecraft:skeleton'). If an entity namespace is not specified, 'minecraft:' is assumed.
    * @param position Location of the entity to test for.
    *
    *
    * @throws This function can throw errors.
    */
  assertEntityTouching(entityIdentifier: string, position: Minecraft.Location): void;
  /**
    * @remarks
    * Tests that a block at a location contains water in addition to another block type. If not, an error is thrown. Water blocks are not considered to be waterlogged.
    *
    * @param location 
    * @param isWaterlogged Whether not not the block at _position_ is expected to be waterlogged.
    *
    *
    * @throws This function can throw errors.
    */
  assertIsWaterlogged(location: Minecraft.BlockLocation, isWaterlogged: boolean): void;
  /**
    * @remarks
    * Tests that items of a particular type and count are present within an area. If not, an error is thrown.
    *
    * @param itemType Type of item to look for.
    * @param location 
    * @param searchDistance Range, in blocks, to aggregate a count of items around. If 0, will only search the particular block at _position_.
    * @param count Number of items, at minimum, to look and test for.
    *
    *
    * @throws This function can throw errors.
    * @example findFeathers.js
    * ```typescript
    *    test.assertItemEntityCountIs(Items.feather, expectedFeatherLoc, 0, 1);
    *    
    * ```
    */
  assertItemEntityCountIs(itemType: Minecraft.ItemType, location: Minecraft.BlockLocation, searchDistance: number, count: number): void;
  /**
    * @remarks
    * Tests that a particular item entity is not present at a particular location. If it is, an exception is thrown.
    *
    * @param itemType Type of item to test for.
    * @param location 
    * @param searchDistance Radius in blocks to look for the item entity.
    *
    *
    * @throws This function can throw errors.
    */
  assertItemEntityNotPresent(itemType: Minecraft.ItemType, location: Minecraft.BlockLocation, searchDistance: number): void;
  /**
    * @remarks
    * Tests that a particular item entity is present at a particular location. If not, an exception is thrown.
    *
    * @param itemType Type of item to test for.
    * @param location 
    * @param searchDistance Radius in blocks to look for the item entity.
    *
    *
    * @throws This function can throw errors.
    */
  assertItemEntityPresent(itemType: Minecraft.ItemType, location: Minecraft.BlockLocation, searchDistance: number): void;
  /**
    * @remarks
    * Tests that Redstone power at a particular location matches a particular value. If not, an exception is thrown.
    *
    * @param location 
    * @param power Expected power level.
    *
    *
    * @throws This function can throw errors.
    */
  assertRedstonePower(location: Minecraft.BlockLocation, power: number): void;
  /**
    * @remarks
    * Marks the current test as a failure case.
    *
    * @param errorMessage Error message summarizing the failure condition.
    *
    *
    * @throws This function can throw errors.
    */
  fail(errorMessage: string): void;
  /**
    *
    * @param callback 
    *
    *
    * @throws This function can throw errors.
    */
  failIf(callback: () => void): void;
  /**
    *
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  getBlock(location: Minecraft.BlockLocation): Minecraft.Block;
  /**
    * @remarks
    * Kills all entities within the GameTest structure.
    *
    *
    *
    * @throws This function can throw errors.
    */
  killAllEntities(): void;
  /**
    * @remarks
    * Presses a button at a block location.
    *
    * @param location 
    *
    *
    * @throws Will throw an error if a button is not present at the specified position.
    */
  pressButton(location: Minecraft.BlockLocation): void;
  /**
    * @remarks
    * Displays the specified message to all players.
    *
    * @param text Message to display.
    *
    *
    * @throws This function can throw errors.
    */
  print(text: string): void;
  /**
    * @remarks
    * Pulls a lever at a block location.
    *
    * @param location 
    *
    *
    * @throws Will throw an error if a lever is not present at the specified position.
    */
  pullLever(location: Minecraft.BlockLocation): void;
  /**
    * @remarks
    * Sends a Redstone pulse at a particular location by creating a temporary Redstone block.
    *
    * @param location 
    * @param duration Number of ticks to pulse Redstone.
    *
    *
    * @throws This function can throw errors.
    */
  pulseRedstone(location: Minecraft.BlockLocation, duration: number): void;
  /**
    * @remarks
    * From a BlockLocation, returns a new BlockLocation with coordinates relative to the current GameTest structure block. For example, the relative coordinates for the block above the structure block are (0, 1, 0). Rotation of the GameTest structure is also taken into account.
    *
    * @param worldLocation Absolute location in the world to convert to a relative location.
    *
    * @returns A location relative to the GameTest command block.
    *
    * @throws This function can throw errors.
    */
  relativeLocation(worldLocation: Minecraft.BlockLocation): Minecraft.BlockLocation;
  /**
    * @remarks
    * Runs a specific callback after a specified delay of ticks
    *
    * @param delayTicks Number of ticks to delay before running the specified callback.
    * @param callback Callback function to execute.
    *
    *
    * @throws This function can throw errors.
    */
  runAfterDelay(delayTicks: number, callback: () => void): void;
  /**
    * @remarks
    * Runs the given callback after a delay of _tick_ ticks from the start of the GameTest.
    *
    * @param tick Tick (after the start of the GameTest) to run the callback at.
    * @param callback Callback function to execute.
    *
    *
    * @throws This function can throw errors.
    */
  runAtTickTime(tick: number, callback: () => void): void;
  /**
    *
    * @param blockData 
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  setBlockPermutation(blockData: Minecraft.BlockPermutation, location: Minecraft.BlockLocation): void;
  /**
    *
    * @param blockType 
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  setBlockType(blockType: Minecraft.BlockType, location: Minecraft.BlockLocation): void;
  /**
    * @remarks
    * Spawns an entity at a location.
    *
    * @param entityIdentifier Type of entity to create. If no namespace is provided, 'minecraft:' is assumed. Note that an optional initial spawn event can be specified between less than/greater than signs (e.g., namespace:entityType<spawnEvent>).
    * @param location 
    *
    * @returns The spawned entity. If the entity cannot be spawned, returns undefined.
    *
    * @throws This function can throw errors.
    * @example spawnAdultPig.js
    * ```typescript
    *    test.spawn("minecraft:pig<minecraft:ageable_grow_up>", new BlockLocation(1, 2, 1));
    *    
    * ```
    */
  spawn(entityIdentifier: string, location: Minecraft.BlockLocation): Minecraft.Entity;
  /**
    * @remarks
    * Spawns an item entity at a specified location.
    *
    * @param itemStack ItemStack that describes the item entity to create.
    * @param position Location to create the item entity at.
    *
    *
    * @throws This function can throw errors.
    * @example spawnEmeralds.js
    * ```typescript
    *    const oneEmerald = new ItemStack(Items.emerald, 1, 0);
    *    const fiveEmeralds = new ItemStack(Items.emerald, 5, 0);
    *    
    *    test.spawnItem(oneEmerald, new Location(3.5, 3, 1.5));
    *    test.spawnItem(fiveEmeralds, new Location(1.5, 3, 1.5));
    *    
    * ```
    */
  spawnItem(itemStack: Minecraft.ItemStack, position: Minecraft.Location): Minecraft.Entity;
  /**
    * @remarks
    * Spawns an entity at a location without any AI behaviors. This method is frequently used in conjunction with methods like .walkTo to create predictable mob actions.
    *
    * @param entityIdentifier 
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  spawnWithoutBehaviors(entityIdentifier: string, location: Minecraft.BlockLocation): Minecraft.Entity;
  /**
    * @remarks
    * Creates a new GameTestSequence - A set of steps that play out sequentially within a GameTest.
    *
    *
    * @returns A new GameTestSequence with chaining methods that facilitate creating a set of steps.
    *
    */
  startSequence(): GameTestSequence;
  /**
    * @remarks
    * Marks the current test as a success case.
    *
    *
    *
    * @throws This function can throw errors.
    */
  succeed(): void;
  /**
    * @remarks
    * Runs the given callback. If the callback does not throw an exception, the test is marked as a success.
    *
    * @param callback Callback function that runs. If the function runs successfully, the test is marked as a success. Typically, this function will have .assertXyz method calls within it.
    *
    *
    * @throws This function can throw errors.
    */
  succeedIf(callback: () => void): void;
  /**
    * @remarks
    * Marks the test as a success at the specified tick.
    *
    * @param tick Tick after the start of the GameTest to mark the test as successful.
    *
    *
    * @throws This function can throw errors.
    */
  succeedOnTick(tick: number): void;
  /**
    * @remarks
    * Runs the given callback at _tick_ ticks after the start of the test. If the callback does not throw an exception, the test is marked as a failure.
    *
    * @param tick Tick after the start of the GameTest to run the testing callback at.
    * @param callback Callback function that runs. If the function runs successfully, the test is marked as a success.
    *
    *
    * @throws This function can throw errors.
    */
  succeedOnTickWhen(tick: number, callback: () => void): void;
  /**
    * @remarks
    * Runs the given callback every tick. When the callback successfully executes, the test is marked as a success. Specifically, the test will succeed when the callback does not throw an exception.
    *
    * @param callback Testing callback function that runs. If the function runs successfully, the test is marked as a success.
    *
    *
    * @throws This function can throw errors.
    */
  succeedWhen(callback: () => void): void;
  /**
    *
    * @param blockType 
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  succeedWhenBlockTypePresent(blockType: Minecraft.BlockType, location: Minecraft.BlockLocation): void;
  /**
    * @remarks
    * Tests for the presence of a component on every tick. When the specified component is found, the test is marked as a success.
    *
    * @param entityIdentifier Type of entity to look for. If no namespace is specified, 'minecraft:' is assumed.
    * @param componentIdentifier Type of component to test for the presence of. If no namespace is specified, 'minecraft:' is assumed.
    * @param location 
    * @param hasComponent 
    *
    *
    * @throws This function can throw errors.
    */
  succeedWhenEntityHasComponent(entityIdentifier: string, componentIdentifier: string, location: Minecraft.BlockLocation, hasComponent: boolean): void;
  /**
    * @remarks
    * Tests every tick and marks the test as a success when a particular entity is not present at a particular location.
    *
    * @param entityIdentifier Type of entity to test for (e.g., 'minecraft:skeleton'). If an entity namespace is not specified, 'minecraft:' is assumed.
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  succeedWhenEntityNotPresent(entityIdentifier: string, location: Minecraft.BlockLocation): void;
  /**
    * @remarks
    * Tests for the presence of an entity on every tick. When an entity of the specified type is found, the test is marked as a success.
    *
    * @param entityIdentifier Type of entity to test for (e.g., 'minecraft:skeleton'). If an entity namespace is not specified, 'minecraft:' is assumed.
    * @param location 
    *
    *
    * @throws This function can throw errors.
    */
  succeedWhenEntityPresent(entityIdentifier: string, location: Minecraft.BlockLocation): void;
  /**
    * @remarks
    * Forces an entity to walk to a particular location. Usually used in conjunction with methods like .spawnWithoutBehaviors to have more predictable mob behaviors.
    *
    * @param mob Mob entity to give orders to.
    * @param location 
    * @param speedModifier Adjustable modifier to the mob's walking speed.
    *
    *
    * @throws This function can throw errors.
    */
  walkTo(mob: Minecraft.Entity, location: Minecraft.BlockLocation, speedModifier: number): void;
  /**
    *
    * @param actor 
    * @param fuseLength 
    *
    *
    * @throws This function can throw errors.
    */
  setTntFuse(actor: Minecraft.Entity, fuseLength: number): void;
  /**
    * @remarks
    * From a BlockLocation with coordinates relative to the GameTest structure block, returns a new BlockLocation with coordinates relative to world. Rotation of the GameTest structure is also taken into account.
    *
    * @param relativeLocation Location relative to the GameTest command block.
    *
    * @returns An absolute location relative to the GameTest command block.
    *
    * @throws This function can throw errors.
    */
  worldLocation(relativeLocation: Minecraft.BlockLocation): Minecraft.BlockLocation;
  }
  
  /** 
   * Executes a set of steps defined via chained .thenXyz methods, sequentially. This facilitates a 'script' of GameTest setup methods and assertions over time.
  * @public
  */
  export class GameTestSequence {
    
  /**
    * @remarks
    * Runs the given callback as a step within a GameTest sequence. Exceptions thrown within the callback will end sequence execution.
    *
    * @param callback Callback function to execute.
    *
    * @returns Returns a GameTestSequence object where additional .thenXyz method steps can be added.
    *
    */
  thenExecute(callback: () => void): GameTestSequence;
  /**
    * @remarks
    * After a delay, runs the given callback as a step within a GameTest sequence. Exceptions thrown within the callback will end sequence execution.
    *
    * @param delayTicks Number of ticks to wait before executing the callback.
    * @param callback Callback function to execute.
    *
    * @returns Returns a GameTestSequence object where additional .thenXyz method steps can be added.
    *
    */
  thenExecuteAfter(delayTicks: number, callback: () => void): GameTestSequence;
  /**
    *
    * @param tickCount 
    * @param callback 
    *
    *
    */
  thenExecuteFor(tickCount: number, callback: () => void): GameTestSequence;
  /**
    * @remarks
    * Causes the test to fail if this step in the GameTest sequence is reached.
    *
    * @param errorMessage Error message summarizing the failure condition.
    *
    *
    */
  thenFail(errorMessage: string): void;
  /**
    * @remarks
    * Idles the GameTest sequence for the specified delayTicks.
    *
    * @param delayTicks Number of ticks to delay for this step in the GameTest sequence.
    *
    * @returns Returns a GameTestSequence object where additional .thenXyz method steps can be added.
    *
    */
  thenIdle(delayTicks: number): GameTestSequence;
  /**
    * @remarks
    * Marks the GameTest a success if this step is reached in the GameTest sequence.
    *
    *
    *
    */
  thenSucceed(): void;
  /**
    * @remarks
    * Executes the given callback every tick until it succeeds. Exceptions thrown within the callback will end sequence execution.
    *
    * @param callback Testing callback function to execute. Typically, this function will have .assertXyz functions within it.
    *
    * @returns Returns a GameTestSequence object where additional .thenXyz method steps can be added.
    *
    */
  thenWait(callback: () => void): GameTestSequence;
  /**
    *
    * @param delayTicks 
    * @param callback 
    *
    *
    */
  thenWaitWithDelay(delayTicks: number, callback: () => void): GameTestSequence;
  }
  
  /** 
  * @public
  */
  export class Tags {
    /**
      */
    "suiteDefault": string
    /**
      */
    "suiteDisabled": string
    /**
      */
    "suiteAll": string
    /**
      */
    "suiteDebug": string
    
  }
  


  /**
    * @remarks
    * Registers a new GameTest function. This GameTest will become available in Minecraft via /gametest run [testClassName]:[testName].
    *
    * @param testClassName Name of the class of tests this test should be a part of.
    * @param testName Name of this specific test.
    * @param testFunction Implementation of the test function.
    *
    * @returns Returns a {@link GameTest.RegistrationBuilder} object where additional options for this test can be specified via builder methods.
    *
    * @example example1.js
    * ```typescript
    *    GameTest.register("ExampleTests", "alwaysFail", (test) => {
    *      test.fail("This test, runnable via '/gametest run ExampleTests:alwaysFail', will always fail");
    *    });
    *    
    * ```
    */
  export function register(testClassName: string, testName: string, testFunction: (arg0: Helper) => void): RegistrationBuilder;
}


