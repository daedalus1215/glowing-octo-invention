import { Inject, Injectable } from "@nestjs/common";
import { DriveKey } from "src/historical-files/types";
import { HistoricalFileRepository } from "../ports/historical-file-repository.port";

@Injectable()
export class FindAllHistoricalFiles {

    constructor(@Inject('HistoricalFileRepository') private readonly fileRepository: HistoricalFileRepository) { }

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