import { Module } from '@nestjs/common';
import { NuclearRunModule } from 'src/nuclear-run/nuclear-run.module';
import { partnerServiceProvider } from 'src/partner/partner.service';

@Module({
    imports: [NuclearRunModule],
    providers: [partnerServiceProvider]
})
export class GraphqlModuleNuclear {}
