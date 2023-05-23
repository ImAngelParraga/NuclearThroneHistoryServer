import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { NuclearRunResolver } from './graphql/graphql.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { NuclearRunModule } from './nuclear-run/nuclear-run.module';
import { FirestoreModule } from './firestore/firestore.module';
import { PartnerService } from './partner/partner.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    NuclearRunModule,
    FirestoreModule
  ],
  controllers: [AppController],
  providers: [AppService, NuclearRunResolver],
})
export class AppModule {}
