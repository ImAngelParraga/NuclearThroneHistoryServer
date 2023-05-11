import { Module } from '@nestjs/common';
import { NuclearRunModule } from 'src/nuclear-run/nuclear-run.module';

@Module({
    imports: [NuclearRunModule]
})
export class GraphqlModuleNuclear {}
