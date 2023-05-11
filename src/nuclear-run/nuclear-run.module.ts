import { Module } from '@nestjs/common';
import { NuclearRunService } from './nuclear-run.service';
import { NuclearRunApiService } from './nuclear-run-api/nuclear-run-api.service';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { NuclearRunController } from './nuclear-run.controller';

const nuclearRunServiceProvider = { provide: 'INuclearRunService', useClass: NuclearRunService }

@Module({
  imports: [FirestoreModule],
  controllers: [NuclearRunController],
  providers: [nuclearRunServiceProvider, NuclearRunApiService],
  exports: [nuclearRunServiceProvider],
})
export class NuclearRunModule { }