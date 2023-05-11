import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class NuclearRunType {

  constructor(
    runId: string,
    character: string,
    lastHit: string,
    world: string,
    worldLevel: number,
    crown: string,
    weaponA: string,
    weaponB: string,
    skin: string,
    ultraMutation: string,
    characterLvl: number,
    loops: number,
    win: boolean,
    mutations: string[],
    kills: number,
    health: number,
    type: string,
    runTimestamp: Date
  ) {
    this.runId = runId;
    this.character = character;
    this.lastHit = lastHit;
    this.world = world;
    this.worldLevel = worldLevel;
    this.crown = crown;
    this.weaponA = weaponA;
    this.weaponB = weaponB;
    this.skin = skin;
    this.ultraMutation = ultraMutation;
    this.characterLvl = characterLvl;
    this.loops = loops;
    this.win = win;
    this.mutations = mutations;
    this.kills = kills;
    this.health = health;
    this.type = type;
    this.runTimestamp = runTimestamp;
  }

  @Field()
  runId: string;

  @Field()
  character: string;

  @Field()
  lastHit: string;

  @Field()
  world: string;

  @Field(() => Int)
  worldLevel: number;

  @Field()
  crown: string;

  @Field()
  weaponA: string;

  @Field()
  weaponB: string;

  @Field()
  skin: string;

  @Field()
  ultraMutation: string;

  @Field(() => Int)
  characterLvl: number;

  @Field(() => Int)
  loops: number;

  @Field()
  win: boolean;

  @Field(() => [String])
  mutations: string[];

  @Field(() => Int)
  kills: number;

  @Field(() => Int)
  health: number;

  @Field()
  type: string;

  @Field(() => Date)
  runTimestamp: Date;
}