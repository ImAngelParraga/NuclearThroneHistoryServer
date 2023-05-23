import { Module } from '@nestjs/common';
import { NuclearRunService } from './nuclear-run.service';
import { NuclearRunApiService } from './nuclear-run-api/nuclear-run-api.service';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { NuclearRunController } from './nuclear-run.controller';
import { partnerServiceProvider } from 'src/partner/partner.service';

const nuclearRunServiceProvider = { provide: 'INuclearRunService', useClass: NuclearRunService }

@Module({
  imports: [FirestoreModule],
  controllers: [NuclearRunController],
  providers: [nuclearRunServiceProvider, NuclearRunApiService, partnerServiceProvider],
  exports: [nuclearRunServiceProvider, partnerServiceProvider],
})
export class NuclearRunModule { }