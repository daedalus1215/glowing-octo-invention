import { Module } from '@nestjs/common';
import { HistoricalFilesController } from './application/controllers/historical-files.controller';
import { HistoricalFilesService } from './domain/services/historical-files.service';
import { S3HistoricalFileDAO } from './infrastructure/daos/s3-historical-file-dao';
import { ConfigModule } from '@nestjs/config';
import { FindAllHistoricalFiles } from './domain/transactionScripts/find-all-historical-files.transaction.script';
import { HydrateBucketContent } from './infrastructure/hydrators/hydrate-bucket-content';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './domain/entities/file.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([File])],
  controllers: [HistoricalFilesController],
  providers: [
    HistoricalFilesService,
    HydrateBucketContent,
    // TS
    FindAllHistoricalFiles,
    {
      provide: 'HistoricalFileRepository',
      useClass: S3HistoricalFileDAO
    }
  ]
})
export class HistoricalFilesModule { }
