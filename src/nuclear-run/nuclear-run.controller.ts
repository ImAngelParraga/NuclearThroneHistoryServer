import { Controller, Get, Headers, Inject, Param, Query, UnauthorizedException } from '@nestjs/common';
import { INuclearRunService } from './nuclear-run.service';
import { NuclearRunEntity, checkAuth } from 'src/shared';
import { AuthorizationNotProvidedException, KeyNotProvidedException, PartnerIdNotProvidedException, SteamIdNotProvidedException } from './nuclear-run-api/nuclear-run-api.errors';
import { IPartnerService } from 'src/partner/partner.service';

export interface ApiResponse<T> {
  statusCode: number
  message: string
  data?: T
}

@Controller()
export class NuclearRunController {
  constructor(
    @Inject('INuclearRunService') private readonly nuclearRunService: INuclearRunService,
    @Inject('IPartnerService') private readonly partnerService: IPartnerService
  ) { }

  @Get('save-user-run')
  async saveLastNuclearRun(
    @Query('steamId') steamId: string,
    @Query('key') key: string,
    @Headers('PartnerId') partnerId: string,
    @Headers('Authorization') auth: string
  ): Promise<ApiResponse<NuclearRunEntity>> {
    if (steamId == undefined) {
      throw new SteamIdNotProvidedException()
    }

    if (key == undefined) {
      throw new KeyNotProvidedException()
    }

    checkAuth(partnerId, auth, this.partnerService)

    const run = await this.nuclearRunService.saveLastRunForUser(steamId, key)

    return {
      statusCode: 200,
      message: "Run saved successfully",
      data: run
    }
  }

}