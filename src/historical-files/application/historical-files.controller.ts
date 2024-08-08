import { Controller, Get } from '@nestjs/common';
import { HistoricalFilesService } from '../domain/historical-files.service';

@Controller('historical-files')
export class HistoricalFilesController {
    constructor(private readonly historicalService: HistoricalFilesService) { }

    @Get()
    findAll(): string {
        return this.historicalService.findAll();
    }

}
