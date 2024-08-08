import { Injectable } from '@nestjs/common';
import { S3HistoricalFileRepository } from '../../infrastructure/repositories/s3-historical-file-repository';
import { DriveKey } from '../../types';
import { FindAllHistoricalFiles } from '../transactionScripts/find-all-historical-files.transaction.script';

@Injectable()
export class HistoricalFilesService {

    constructor(private readonly findAllHistoricalFiles: FindAllHistoricalFiles) { }

    findAll(driveKey: DriveKey, path: string) {
        return this.findAllHistoricalFiles.apply(driveKey, path);
    }
}
