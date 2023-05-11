import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { INuclearRunService } from './nuclear-run.service';
import { NuclearRunEntity } from 'src/shared';

@Controller()
export class NuclearRunController {
  constructor(@Inject('INuclearRunService') private readonly nuclearRunService: INuclearRunService) {}

  @Get('save-user-runs')
  async saveLastNuclearRun(@Query('steamId') steamId: string, @Query('key') key: string): Promise<boolean> {
    return await this.nuclearRunService.saveLastRunForUser(steamId, key)
  }
}