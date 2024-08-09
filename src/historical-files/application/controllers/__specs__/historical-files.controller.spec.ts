import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalFilesController } from '../historical-files.controller';
import { HistoricalFilesService } from '../../../domain/services/historical-files.service';
import { DriveKey } from '../../../types';
import { getRandomDriveKey } from 'src/test-utils/test-utils';

describe('HistoricalFilesController', () => {
  let target: HistoricalFilesController;
  let historicalFilesServiceMock: jest.Mocked<HistoricalFilesService>;

  beforeEach(async () => {
    historicalFilesServiceMock = { findAll: jest.fn() } as unknown as jest.Mocked<HistoricalFilesService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricalFilesController],
      providers: [
        { provide: HistoricalFilesService, useValue: historicalFilesServiceMock }, 
      ],
    }).compile();

    target = module.get<HistoricalFilesController>(HistoricalFilesController);
  });

  describe('#findAll', () => {
    it('should call HistoricalFilesService.findAll with the correct parameters', () => {
      const driveKey: DriveKey = getRandomDriveKey(); 
      const path = 'some/folder/path/';
  
      target.findAll(driveKey, path);
  
      expect(historicalFilesServiceMock.findAll).toHaveBeenCalledWith(driveKey, path);
    });
  
    it('should default path to an empty string if not provided', () => {
      const driveKey: DriveKey = getRandomDriveKey();  
  
      target.findAll(driveKey);
  
      expect(historicalFilesServiceMock.findAll).toHaveBeenCalledWith(driveKey, '');
    });
  })
});