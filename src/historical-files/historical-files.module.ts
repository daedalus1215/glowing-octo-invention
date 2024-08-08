import { Module } from '@nestjs/common';
import { HistoricalFilesController } from './application/historical-files.controller';
import { HistoricalFilesService } from './domain/historical-files.service';

@Module({
  controllers: [HistoricalFilesController],
  providers: [HistoricalFilesService]
})
export class HistoricalFilesModule {}
