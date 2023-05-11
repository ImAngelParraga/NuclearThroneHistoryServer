import { NuclearRunType } from './graphql/graphql.schema';
import { instanceToPlain, plainToInstance } from 'class-transformer';

export class NuclearRun {
  id: string;
  character: string;
  lastHit: string;
  world: string;
  worldLevel: number;
  crown: string;
  weaponA: string;
  weaponB: string;
  skin: string;
  ultraMutation: string;
  characterLvl: number;
  loops: number;
  win: boolean;
  mutations: string[];
  kills: number;
  health: number;
  type: string;
  runTimestamp: number;
}

export class NuclearRunEntity {
  constructor(
    public id: string, // Id is runTimestamp as string to make it easier to search
    public character: string,
    public lastHit: string,
    public world: string,
    public worldLevel: number,
    public crown: string,
    public weaponA: string,
    public weaponB: string,
    public skin: string,
    public ultraMutation: string,
    public characterLvl: number,
    public loops: number,
    public win: boolean,
    public mutations: string[],
    public kills: number,
    public health: number,
    public type: string,
    public runTimestamp: number,
  ) {}
}

export const nuclearRunEntityConverter = {
  fromFirestore: (data: FirebaseFirestore.DocumentData) => {
    return new NuclearRunEntity(
      data.id,
      data.character,
      data.lastHit,
      data.world,
      data.worldLevel,
      data.crown,
      data.weaponA,
      data.weaponB,
      data.skin,
      data.ultraMutation,
      data.characterLvl,
      data.loops,
      data.win,
      data.mutations,
      data.kills,
      data.health,
      data.type,
      data.runTimestamp,
    );
  },

  toEntityType: (nuclearRunEntity: NuclearRunEntity) => {
    return new NuclearRunType(
      nuclearRunEntity.id,
      nuclearRunEntity.character,
      nuclearRunEntity.lastHit,
      nuclearRunEntity.world,
      nuclearRunEntity.worldLevel,
      nuclearRunEntity.crown,
      nuclearRunEntity.weaponA,
      nuclearRunEntity.weaponB,
      nuclearRunEntity.skin,
      nuclearRunEntity.ultraMutation,
      nuclearRunEntity.characterLvl,
      nuclearRunEntity.loops,
      nuclearRunEntity.win,
      nuclearRunEntity.mutations,
      nuclearRunEntity.kills,
      nuclearRunEntity.health,
      nuclearRunEntity.type,
      new Date(nuclearRunEntity.runTimestamp * 1000)
    );
  },
};
