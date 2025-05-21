import { Test, TestingModule } from '@nestjs/testing';
import { FarmService } from '../farms/farm.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Farm } from '../farms/entities/farm.entity';
import { Producer } from '../producers/entities/producer.entity';
import { Repository } from 'typeorm';

const mockProducer = { id: 'prod-1', name: 'João', document: '12345678901', farms: [] };
const mockFarm = {
  id: 'farm-1',
  name: 'Fazenda Boa Vista',
  city: 'Cidade',
  state: 'SP',
  total_area: 100,
  agricultural_area: 60,
  vegetation_area: 40,
  producer: mockProducer,
  crops: [],
  harvests: [],
};

describe('FarmService', () => {
  let service: FarmService;
  let farmRepo: Repository<Farm>;
  let prodRepo: Repository<Producer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmService,
        {
          provide: getRepositoryToken(Farm),
          useValue: {
            create: jest.fn().mockReturnValue(mockFarm),
            save: jest.fn().mockResolvedValue(mockFarm),
            find: jest.fn().mockResolvedValue([mockFarm]),
            findOne: jest.fn(), // will set return value per test
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: getRepositoryToken(Producer),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockProducer),
          },
        },
      ],
    }).compile();

    service = module.get(FarmService);
    farmRepo = module.get(getRepositoryToken(Farm));
    prodRepo = module.get(getRepositoryToken(Producer));
    // Reset mocks before each test
    (farmRepo.findOne as jest.Mock).mockReset();
  });

  it('should create a farm', async () => {
    (farmRepo.findOne as jest.Mock).mockResolvedValue(null); // No duplicate
    const dto = {
      name: 'Fazenda Boa Vista',
      city: 'Cidade',
      state: 'SP',
      total_area: 100,
      agricultural_area: 60,
      vegetation_area: 40,
      producerId: 'prod-1',
    };
    expect(await service.create(dto)).toEqual(mockFarm);
  });

  it('should find all farms', async () => {
    expect(await service.findAll()).toEqual([mockFarm]);
  });

  it('should find one farm', async () => {
    (farmRepo.findOne as jest.Mock).mockResolvedValue(mockFarm);
    expect(await service.findOne('farm-1')).toEqual(mockFarm);
  });

  it('should update a farm', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockFarm);
    expect(await service.update('farm-1', { name: 'Nova Fazenda' })).toEqual(mockFarm);
  });

  it('should remove a farm', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockFarm);
    await expect(service.remove('farm-1')).resolves.toBeUndefined();
  });

  it('should not allow duplicate farm name for same producer', async () => {
    // Simula que já existe uma fazenda com o mesmo nome para o produtor apenas na verificação de duplicidade
    (farmRepo.findOne as jest.Mock).mockImplementationOnce(({ where }) => {
      if (where && where.name === 'Fazenda Boa Vista' && where.producer && where.producer.id === 'prod-1') return mockFarm;
      return null;
    });
    const dto = {
      name: 'Fazenda Boa Vista',
      city: 'Cidade',
      state: 'SP',
      total_area: 100,
      agricultural_area: 60,
      vegetation_area: 40,
      producerId: 'prod-1',
    };
    await expect(service.create(dto)).rejects.toThrowError(expect.objectContaining({
      message: 'Já existe uma fazenda com este nome para este produtor'
    }));
  });
});
