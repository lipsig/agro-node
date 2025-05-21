import { Test, TestingModule } from '@nestjs/testing';
import { ProducersService } from '../producers/producer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Producer } from '../producers/entities/producer.entity';
import { Repository } from 'typeorm';

const mockProducer = {
  id: 'uuid-1',
  name: 'João Silva',
  document: '12345678901',
  farms: [],
};

describe('ProducersService', () => {
  let service: ProducersService;
  let repo: Repository<Producer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        {
          provide: getRepositoryToken(Producer),
          useValue: {
            create: jest.fn().mockReturnValue(mockProducer),
            save: jest.fn().mockResolvedValue(mockProducer),
            find: jest.fn().mockResolvedValue([mockProducer]),
            findOne: jest.fn(), // will set return value per test
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get(ProducersService);
    repo = module.get(getRepositoryToken(Producer));
    // Reset mocks before each test
    (repo.findOne as jest.Mock).mockReset();
  });

  it('should create a producer', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null); // No duplicate
    const dto = { name: 'João Silva', document: '12345678901' };
    expect(await service.create(dto)).toEqual(mockProducer);
  });

  it('should find all producers', async () => {
    expect(await service.findAll()).toEqual([mockProducer]);
  });

  it('should find one producer', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(mockProducer);
    expect(await service.findOne('uuid-1')).toEqual(mockProducer);
  });

  it('should update a producer', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockProducer);
    expect(await service.update('uuid-1', { name: 'Novo Nome' })).toEqual(mockProducer);
  });

  it('should remove a producer', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockProducer);
    await expect(service.remove('uuid-1')).resolves.toBeUndefined();
  });

  it('should not allow duplicate document', async () => {
    // Simula que já existe um produtor com o mesmo documento apenas na verificação de duplicidade
    (repo.findOne as jest.Mock).mockImplementationOnce(({ where }) => {
      if (where && where.document === '12345678901') return mockProducer;
      return null;
    });
    const dto = { name: 'Outro Nome', document: '12345678901' };
    await expect(service.create(dto)).rejects.toThrowError(expect.objectContaining({
      message: 'Já existe um produtor com este CPF/CNPJ'
    }));
  });
});
