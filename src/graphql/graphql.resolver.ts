import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { INuclearRunService } from 'src/nuclear-run/nuclear-run.service';
import { NuclearRunType } from './graphql.schema';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { checkAuth, nuclearRunEntityConverter } from 'src/shared';
import { AuthorizationNotProvidedException, PartnerIdNotProvidedException, RunIdNotProvidedException, SteamIdNotProvidedException } from 'src/nuclear-run/nuclear-run-api/nuclear-run-api.errors';
import { IPartnerService } from 'src/partner/partner.service';

@Resolver(() => NuclearRunType)
export class NuclearRunResolver {
  constructor(
    @Inject('INuclearRunService') private readonly nuclearRunService: INuclearRunService,
    @Inject('IPartnerService') private readonly partnerService: IPartnerService
  ) { }

  @Query(() => [NuclearRunType])
  async runsForUser(@Args('steamId') steamId: string, @Context() context: any): Promise<NuclearRunType[]> {
    if (steamId == undefined) {
      throw new SteamIdNotProvidedException()
    }

    this.checkGQLAuth(context)

    const runsEntity = await this.nuclearRunService.findAllRunsForUser(steamId);
    return runsEntity.map(entity => nuclearRunEntityConverter.toEntityType(entity));
  }

  @Query(() => NuclearRunType)
  async runByIdForUser(@Args('steamId') steamId: string, @Args('runId') runId: string, @Context() context: any): Promise<NuclearRunType> {
    if (steamId == undefined) {
      throw new SteamIdNotProvidedException()
    }

    if (runId == undefined) {
      throw new RunIdNotProvidedException()
    }

    this.checkGQLAuth(context)

    const nuclearRunEntity = await this.nuclearRunService.findRunByIdForUser(steamId, runId);
    return nuclearRunEntityConverter.toEntityType(nuclearRunEntity);
  }

  private checkGQLAuth(context: any) {
    const headers = context.req.headers
    const partnerId = headers['partnerid']
    const auth = headers.authorization
    checkAuth(partnerId, auth, this.partnerService)
  }
}