import { Module } from '@nestjs/common';
import { NuclearRunService } from './nuclear-run.service';
import { NuclearRunApiService } from './nuclear-run-api/nuclear-run-api.service';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { NuclearRunController } from './nuclear-run.controller';
import { PartnerService } from 'src/partner/partner.service';

const nuclearRunServiceProvider = { provide: 'INuclearRunService', useClass: NuclearRunService }
const partnerServiceProvider = { provide: 'IPartnerService', useClass: PartnerService}

@Module({
  imports: [FirestoreModule, ],
  controllers: [NuclearRunController],
  providers: [nuclearRunServiceProvider, NuclearRunApiService, partnerServiceProvider],
  exports: [nuclearRunServiceProvider],
})
export class NuclearRunModule { }