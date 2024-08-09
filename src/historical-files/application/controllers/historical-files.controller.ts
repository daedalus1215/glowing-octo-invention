import { Controller, Get, Post, Query } from '@nestjs/common';
import { HistoricalFilesService } from '../../domain/services/historical-files.service';
import { DriveKey } from '../../types';
import { DriveKeyParam } from '../decorators/drive-key.decorator';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('HistoricalFiles')
@Controller('/api/historical-files')
export class HistoricalFilesController {
    constructor(private readonly historicalService: HistoricalFilesService) { }

    @ApiOperation({ summary: 'Load all files into our table' })
    @ApiResponse({ status: 200, description: 'List of files and folders retrieved successfully' })
    @ApiResponse({ status: 400, description: 'Invalid driveKey or path' })
    @Get('/load')
    load() {
        this.historicalService.load();
    }
    
    @ApiParam({
        name: 'driveKey',
        description: 'The drive key to identify the source (R, V, T)',
        enum: ['R', 'V', 'T'],
        required: true,
    })
    @ApiQuery({
        name: 'path',
        description: 'The path within the drive to list files and folders',
        required: false,
        example: 'some/folder/path/',
    })
    @ApiOperation({ summary: 'Retrieve all files and folders for a given driveKey and path' })
    @ApiResponse({ status: 200, description: 'List of files and folders retrieved successfully' })
    @ApiResponse({ status: 400, description: 'Invalid driveKey or path' })
    @Get('/:driveKey')
    findAll(@DriveKeyParam() driveKey: DriveKey, @Query('path') path: string = '') {
        return this.historicalService.findAll(driveKey, path);
    }
}
