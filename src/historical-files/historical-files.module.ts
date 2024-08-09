import { Module } from '@nestjs/common';
import { HistoricalFilesController } from './application/controllers/historical-files.controller';
import { HistoricalFilesService } from './domain/services/historical-files.service';
import { S3HistoricalFileRepository } from './infrastructure/repositories/s3-historical-file-repository';
import { ConfigModule } from '@nestjs/config';
import { FindAllHistoricalFiles } from './domain/transactionScripts/find-all-historical-files.transaction.script';
import { HydrateBucketContent } from './infrastructure/hydrators/hydrate-bucket-content';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [HistoricalFilesController],
  providers: [
    HistoricalFilesService,
    S3HistoricalFileRepository,
    FindAllHistoricalFiles,
    HydrateBucketContent
  ]
})
export class HistoricalFilesModule { }
