import { Injectable } from "@nestjs/common";
import { S3HistoricalFileRepository } from "src/historical-files/infrastructure/repositories/s3-historical-file-repository";
import { DriveKey } from "src/historical-files/types";

@Injectable()
export class FindAllHistoricalFiles {

    constructor(private readonly fileRepository: S3HistoricalFileRepository) { }

    apply(driveKey: DriveKey, path: string) {
        return this.fileRepository.findAll(driveKey, this.addLastSlashForPathIfMissing(path));
    }

    addLastSlashForPathIfMissing(path: string): string {
        if (path && !path.endsWith('/')) {
            return path + '/';
        }

        return path;
    }
}