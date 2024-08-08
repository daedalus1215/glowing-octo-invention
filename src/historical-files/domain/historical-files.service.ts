import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoricalFilesService {

    findAll(): string {
        return 'Historical Files Service'
    }
}
