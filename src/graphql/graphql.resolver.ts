import { Resolver, Query, Args } from '@nestjs/graphql';
import { INuclearRunService } from 'src/nuclear-run/nuclear-run.service';
import { NuclearRunType } from './graphql.schema';
import { Inject } from '@nestjs/common';
import { nuclearRunEntityConverter } from 'src/shared';

@Resolver(() => NuclearRunType)
export class NuclearRunResolver {
  constructor(@Inject('INuclearRunService') private readonly nuclearRunService: INuclearRunService) {}

  @Query(() => [NuclearRunType])
  async runsForUser(@Args('steamId') steamId: string): Promise<NuclearRunType[]> {
    const runsEntity = await this.nuclearRunService.findAllRunsForUser(steamId);
    return runsEntity.map(entity => nuclearRunEntityConverter.toEntityType(entity));
  }

  @Query(() => NuclearRunType)
  async runByIdForUser(@Args('steamId') steamId: string, @Args('runId') runId: string): Promise<NuclearRunType> {
    const nuclearRunEntity = await this.nuclearRunService.findRunByIdForUser(steamId, runId);
    return nuclearRunEntityConverter.toEntityType(nuclearRunEntity);
  }
}