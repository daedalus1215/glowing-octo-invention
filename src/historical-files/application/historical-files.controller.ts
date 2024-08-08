import { Controller, Get, Query } from '@nestjs/common';
import { HistoricalFilesService } from '../domain/historical-files.service';

@Controller('historical-files')
export class HistoricalFilesController {
    constructor(private readonly historicalService: HistoricalFilesService) { }

    @Get()
    findAll(@Query('path') path: string) {
        console.log('path1', path)
        return this.historicalService.findAll(path);
    }

}
