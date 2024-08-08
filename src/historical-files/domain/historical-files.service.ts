import { Injectable } from '@nestjs/common';
import { S3FileRepository } from '../infrastructure/s3-file-repository';

@Injectable()
export class HistoricalFilesService {

    constructor(private readonly fileRepository: S3FileRepository) { }

    findAll(path: string) {
        return this.fileRepository.findAll(path);
    }
}
