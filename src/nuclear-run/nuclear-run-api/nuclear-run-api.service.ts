import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { NuclearRunEntity } from 'src/shared';
import { NuclearApiResponse } from './nuclear-run-api-shared';
import { RunNotFounException } from './nuclear-run-api.errors';

@Injectable()
export class NuclearRunApiService {
  private readonly BASE_URL = 'https://tb-api.xyz/stream/get?';

  async getCurrentRun(steamId: string, key: string): Promise<NuclearRunEntity> {
    const response = await this.callNuclearApiAndGetResponse(steamId, key);
    if (!response?.current) {
      throw new RunNotFounException()
    }
    return response.current.toNuclearRunEntity();
  }
  
  async getPreviousRun(steamId: string, key: string): Promise<NuclearRunEntity> {
    const response = await this.callNuclearApiAndGetResponse(steamId, key);

    if (!response?.previous) {
      throw new RunNotFounException()
    }

    return response.previous.toNuclearRunEntity();
  }
  

  private async callNuclearApiAndGetResponse(steamId: string, key: string): Promise<NuclearApiResponse | null> {
    const params = {
      s: steamId,
      key: key,
    };

    try {
      const response = await axios.get(`${this.BASE_URL}`, { params });
      const data = response.data;
      const nuclearApiResponse = new NuclearApiResponse(data);
      if (nuclearApiResponse.current || nuclearApiResponse.previous) {
        return nuclearApiResponse;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error calling Nuclear Throne API: ${error}`);
      return null;
    }
  }
}
