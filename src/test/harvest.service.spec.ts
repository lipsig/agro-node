import { Test, TestingModule } from '@nestjs/testing';
import { HarvestService } from '../harvests/harvest.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Harvest } from '../harvests/entities/harvest.entity';
import { Farm } from '../farms/entities/farm.entity';
import { Repository } from 'typeorm';

const mockFarm = { id: 'farm-1', name: 'Fazenda', harvests: [] };
const mockHarvest = { id: 'harv-1', name: 'Safra 2021', farm: mockFarm, crops: [] };

describe('HarvestService', () => {
  let service: HarvestService;
  let harvestRepo: Repository<Harvest>;
  let farmRepo: Repository<Farm>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestService,
        {
          provide: getRepositoryToken(Harvest),
          useValue: {
            create: jest.fn().mockReturnValue(mockHarvest),
            save: jest.fn().mockResolvedValue(mockHarvest),
            find: jest.fn().mockResolvedValue([mockHarvest]),
            findOne: jest.fn().mockResolvedValue(mockHarvest),
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
      ],
    }).compile();

    service = module.get(HarvestService);
    harvestRepo = module.get(getRepositoryToken(Harvest));
    farmRepo = module.get(getRepositoryToken(Farm));
  });

  it('should create a harvest', async () => {
    const dto = { name: 'Safra 2021', farmId: 'farm-1' };
    expect(await service.create(dto)).toEqual(mockHarvest);
  });

  it('should find all harvests', async () => {
    expect(await service.findAll()).toEqual([mockHarvest]);
  });

  it('should find one harvest', async () => {
    expect(await service.findOne('harv-1')).toEqual(mockHarvest);
  });

  it('should update a harvest', async () => {
    await expect(service.update('harv-1', { name: 'Nova Safra' })).resolves.toBeUndefined();
  });

  it('should remove a harvest', async () => {
    await expect(service.remove('harv-1')).resolves.toBeUndefined();
  });
});