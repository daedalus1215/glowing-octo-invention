import { Injectable } from '@nestjs/common';
import { S3HistoricalFileDAO } from '../../infrastructure/daos/s3-historical-file-dao';
import { DriveKey } from '../../types';
import { FindAllHistoricalFiles } from '../transactionScripts/find-all-historical-files.transaction.script';
import { LoadFilesFromHistoricalFiles } from '../transactionScripts/load-files-from-historical-files.transaction.scripts';

@Injectable()
export class HistoricalFilesService {

    constructor(private readonly findAllHistoricalFiles: FindAllHistoricalFiles,
        private readonly loadFilesFromHistoricalFiles: LoadFilesFromHistoricalFiles) { }

    findAll(driveKey: DriveKey, path: string) {
        return this.findAllHistoricalFiles.apply(driveKey, path);
    }

    load() {
        return this.loadFilesFromHistoricalFiles.apply()
    }
}
