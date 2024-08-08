import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalFilesController } from './historical-files.controller';
import { HistoricalFilesService } from '../domain/historical-files.service';

describe('HistoricalFilesController', () => {
  let target: HistoricalFilesController;
  let mockHistoricalFilesService: Partial<HistoricalFilesService>

  beforeEach(async () => {
    mockHistoricalFilesService = {
      findAll: () => Promise.resolve('' as unknown as string)
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricalFilesController],
      providers: [
        {
          provide: HistoricalFilesService,
          useValue: mockHistoricalFilesService
        }
      ]
    }).compile();

    target = module.get<HistoricalFilesController>(HistoricalFilesController);
  });

  it('should be defined', () => {
    // Arrange, Act, Assert
    expect(target).toBeDefined();
  });

  describe('#findAll', () => {
    it('should...', () => {
        // Arrange
        const expected = 'expected value'
        const findAllSpy = jest.fn().mockImplementation(() => expected);
        mockHistoricalFilesService.findAll = findAllSpy;

        // Act
        const actual = target.findAll();

        // Assert
        expect(findAllSpy).toHaveBeenCalledTimes(1)
        expect(actual).toEqual(expected)
    });
  });
});
