import { Module } from '@nestjs/common';
import { HistoricalFilesController } from './application/historical-files.controller';
import { HistoricalFilesService } from './domain/historical-files.service';
import { S3FileRepository } from './infrastructure/s3-file-repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [HistoricalFilesController],
  providers: [HistoricalFilesService, S3FileRepository]
})
export class HistoricalFilesModule { }
