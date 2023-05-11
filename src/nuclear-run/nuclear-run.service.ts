import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { NuclearRunEntity, nuclearRunEntityConverter } from 'src/shared';
import { getRunPathFromUser, getRunsCollectionPathForUser } from 'src/firestore/firestorePaths';
import { NuclearRunApiService } from './nuclear-run-api/nuclear-run-api.service';
import { DocNotFound } from 'src/firestore/firestore.errors';
import { NuclearErrorMap, NuclearErrors } from './nuclear-run-api/nuclear-run-api.errors';

export interface INuclearRunService {
  findAllRunsForUser(steamId: string): Promise<NuclearRunEntity[]>;
  findRunByIdForUser(steamId: string, runId: string): Promise<NuclearRunEntity>;
  saveLastRunForUser(steamId: string, key: string): Promise<boolean>;
}

@Injectable()
export class NuclearRunService implements INuclearRunService {
  constructor(
    private readonly firestoreService: FirestoreService,
    private readonly nuclearRunApiService: NuclearRunApiService
  ) { }

  async findAllRunsForUser(steamId: string): Promise<NuclearRunEntity[]> {
    const rawData = await this.firestoreService.getCollection(getRunsCollectionPathForUser(steamId));
    const runs = rawData.map((data) => nuclearRunEntityConverter.fromFirestore(data));
    return runs;
  }

  async findRunByIdForUser(steamId: string, runId: string): Promise<NuclearRunEntity> {
    try {
      const data = await this.firestoreService.getDocument(getRunsCollectionPathForUser(steamId), runId);
      return nuclearRunEntityConverter.fromFirestore(data);
    } catch (error) {
      if (error instanceof DocNotFound) {
        throw NuclearErrorMap.get(NuclearErrors.NoRunFound)
      } else {
        throw error
      }
    }
  }

  async saveLastRunForUser(steamId: string, key: string): Promise<boolean> {
    const lastNuclearRun = await this.nuclearRunApiService.getPreviousRun(steamId.toString(), key);
    if (!this.runExists(steamId, lastNuclearRun.id)) {
      throw NuclearErrorMap.get(NuclearErrors.RunAlreadyExists)
    }
    await this.firestoreService.createDocument<NuclearRunEntity>(getRunsCollectionPathForUser(steamId), lastNuclearRun.id, lastNuclearRun);
    return true
  }

  private async runExists(steamId: string, runId: string): Promise<boolean> {
    try {
      await this.findRunByIdForUser(steamId, runId);
      return true
    } catch (error) {
      return false
    }
  }
}