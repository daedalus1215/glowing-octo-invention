import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalFilesService } from '../historical-files.service';
import { FindAllHistoricalFiles } from '../../transactionScripts/find-all-historical-files.transaction.script';
import { DriveKey } from '../../../types';
import { getRandomDriveKey } from '../../../../test-utils/test-utils';

describe('HistoricalFilesService', () => {
  let target: HistoricalFilesService;
  let mockFindAllHistoricalFiles: jest.Mocked<FindAllHistoricalFiles>;

  beforeEach(async () => {
    mockFindAllHistoricalFiles = { apply: jest.fn() } as unknown as jest.Mocked<FindAllHistoricalFiles>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoricalFilesService,
        { provide: FindAllHistoricalFiles, useValue: mockFindAllHistoricalFiles },
      ],
    }).compile();

    target = module.get<HistoricalFilesService>(HistoricalFilesService);
  });

  it('should be defined', () => {
    expect(target).toBeDefined();
  });

  describe('#findAll', () => {
    it('should call findAllHistoricalFiles.apply with the correct parameters', () => {
      // Arrange
      const driveKey: DriveKey = getRandomDriveKey();
      const path = '/path/to/files';
      const expected = "expected";
      const applySpy = jest.fn().mockImplementation(() => expected)
      mockFindAllHistoricalFiles.apply = applySpy;

      // Act
      const actual = target.findAll(driveKey, path);

      // Assert
      expect(applySpy).toHaveBeenCalledWith(driveKey, path);
      expect(actual).toEqual(expected);
    });
  });
});