import { Controller, Get, Param, Query } from '@nestjs/common';
import { HistoricalFilesService } from '../../domain/services/historical-files.service';
import { DriveKey } from '../../types';
import { DriveKeyParam } from '../decorators/drive-key.decorator';

@Controller('historical-files')
export class HistoricalFilesController {
    constructor(private readonly historicalService: HistoricalFilesService) { }

    @Get('/:driveKey')
    findAll(@DriveKeyParam() driveKey: DriveKey, @Query('path') path: string) {
        return this.historicalService.findAll(driveKey, path);
    }
}
