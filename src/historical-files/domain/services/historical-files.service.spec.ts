import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalFilesService } from './historical-files.service';

describe('HistoricalFilesService', () => {
  let service: HistoricalFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricalFilesService],
    }).compile();

    service = module.get<HistoricalFilesService>(HistoricalFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
