import { Test, TestingModule } from '@nestjs/testing';
import { CropService } from '../crops/crop.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Crop } from '../crops/entities/crop.entity';
import { Farm } from '../farms/entities/farm.entity';
import { Harvest } from '../harvests/entities/harvest.entity';
import { Repository } from 'typeorm';

const mockCrop = {
  id: 'crop-1',
  name: 'Soja',
  farm: { id: 'farm-1', name: 'Fazenda' },
  harvest: { id: 'harv-1', name: 'Safra 2021' },
};

const mockFarm = { id: 'farm-1', name: 'Fazenda' };
const mockHarvest = { id: 'harv-1', name: 'Safra 2021' };

describe('CropService', () => {
  let service: CropService;
  let cropRepo: Repository<Crop>;
  let farmRepo: Repository<Farm>;
  let harvestRepo: Repository<Harvest>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropService,
        {
          provide: getRepositoryToken(Crop),
          useValue: {
            create: jest.fn().mockReturnValue(mockCrop),
            save: jest.fn().mockResolvedValue(mockCrop),
            find: jest.fn().mockResolvedValue([mockCrop]),
            findOne: jest.fn().mockResolvedValue(mockCrop),
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: getRepositoryToken(Farm),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockFarm),
          },
        },
        {
          provide: getRepositoryToken(Harvest),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockHarvest),
          },
        },
      ],
    }).compile();

    service = module.get(CropService);
    cropRepo = module.get(getRepositoryToken(Crop));
    farmRepo = module.get(getRepositoryToken(Farm));
    harvestRepo = module.get(getRepositoryToken(Harvest));
  });

  it('should create a crop', async () => {
    const dto = { name: 'Soja', farmId: 'farm-1', harvestId: 'harv-1' };
    expect(await service.create(dto)).toEqual(mockCrop);
  });

  it('should find all crops', async () => {
    expect(await service.findAll()).toEqual([mockCrop]);
  });

  it('should find one crop', async () => {
    expect(await service.findOne('crop-1')).toEqual(mockCrop);
  });

  it('should update a crop', async () => {
    await expect(service.update('crop-1', { name: 'Milho' })).resolves.toEqual(mockCrop);
  });

  it('should remove a crop', async () => {
    await expect(service.remove('crop-1')).resolves.toBeUndefined();
  });
});
