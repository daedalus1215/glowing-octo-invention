import { Test, TestingModule } from '@nestjs/testing';
import { FindAllHistoricalFiles } from '../find-all-historical-files.transaction.script';
import { HistoricalFileRepository } from '../../ports/historical-file-repository.port';
import { DriveKey } from 'src/historical-files/types';
import { getRandomDriveKey } from 'src/test-utils/test-utils';

describe('FindAllHistoricalFiles', () => {
  let target: FindAllHistoricalFiles;
  let mockFileRepository: jest.Mocked<HistoricalFileRepository>;

  beforeEach(async () => {
    mockFileRepository = {
      findAll: jest.fn(),
    } as jest.Mocked<HistoricalFileRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllHistoricalFiles,
        { provide: 'HistoricalFileRepository', useValue: mockFileRepository },
      ],
    }).compile();

    target = module.get<FindAllHistoricalFiles>(FindAllHistoricalFiles);
  });


  describe('#apply', () => {
    it('should call fileRepository.findAll with the correct parameters', () => {
      const driveKey: DriveKey =  getRandomDriveKey();  // Example drive key
      const path = 'some/folder/path';

      target.apply(driveKey, path);

      expect(mockFileRepository.findAll).toHaveBeenCalledWith(driveKey, 'some/folder/path/');
    });
  });

  describe('#addLastSlashForPathIfMissing', () => {
    it('should add a slash if the path does not end with one', () => {
      const path = 'some/folder/path';
      expect(target.addLastSlashForPathIfMissing(path)).toBe('some/folder/path/');
    });

    it('should return the same path if it already ends with a slash', () => {
      const path = 'some/folder/path/';
      expect(target.addLastSlashForPathIfMissing(path)).toBe(path);
    });

    it('should return an empty string if the path is empty', () => {
      const path = '';
      expect(target.addLastSlashForPathIfMissing(path)).toBe('');
    });
  });
});
