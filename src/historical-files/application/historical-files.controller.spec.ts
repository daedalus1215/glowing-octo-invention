import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalFilesController } from './historical-files.controller';

describe('HistoricalFilesController', () => {
  let controller: HistoricalFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricalFilesController],
    }).compile();

    controller = module.get<HistoricalFilesController>(HistoricalFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
