import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { INuclearRunService } from './nuclear-run.service';
import { NuclearRunEntity } from 'src/shared';
import { KeyNotProvidedException, SteamIdNotProvidedException } from './nuclear-run-api/nuclear-run-api.errors';

export interface ApiResponse<T> {
  statusCode: number
  message: string
  data?: T
}

@Controller()
export class NuclearRunController {
  constructor(@Inject('INuclearRunService') private readonly nuclearRunService: INuclearRunService) { }

  @Get('save-user-run')
  async saveLastNuclearRun(@Query('steamId') steamId: string, @Query('key') key: string): Promise<ApiResponse<NuclearRunEntity>> {
    if (steamId == undefined) {
      throw new SteamIdNotProvidedException()
    }

    if (key == undefined) {
      throw new KeyNotProvidedException()
    }

    const run = await this.nuclearRunService.saveLastRunForUser(steamId, key)

    return {
      statusCode: 200,
      message: "Run saved successfully",
      data: run
    }
  }
}