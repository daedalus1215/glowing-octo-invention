import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoricalFilesModule } from './historical-files/historical-files.module';

@Module({
  imports: [HistoricalFilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}