import { Injectable } from '@nestjs/common';
import { DriveKey } from 'src/historical-files/types';
import { FindAllHistoricalFiles } from '../transactionScripts/find-all-historical-files.transaction.script';

@Injectable()
export class HistoricalFilesService {

    constructor(private readonly findAllHistoricalFiles: FindAllHistoricalFiles) {}

    findAll(driveKey: DriveKey, path: string) {
        return this.findAllHistoricalFiles.apply(driveKey, path);
    }
}
