import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProducersService } from './producers/producer.service';
import { FarmService } from './farms/farm.service';
import { HarvestService } from './harvests/harvest.service';
import { CropService } from './crops/crop.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const producers = app.get(ProducersService);
  const farms = app.get(FarmService);
  const harvests = app.get(HarvestService);
  const crops = app.get(CropService);

  // Crie produtores
  const prod1 = await producers.create({ name: 'Produtor 1', document: '12345678901' });
  const prod2 = await producers.create({ name: 'Produtor 2', document: '98765432100' });

  // Crie fazendas
  const farm1 = await farms.create({
    name: 'Fazenda um',
    city: 'Cidade A',
    state: 'SP',
    total_area: 100,
    agricultural_area: 60,
    vegetation_area: 40,
    producerId: prod1.id,
  });

  const farm2 = await farms.create({
    name: 'Fazenda dois',
    city: 'Cidade B',
    state: 'MG',
    total_area: 200,
    agricultural_area: 120,
    vegetation_area: 80,
    producerId: prod2.id,
  });

  // Crie safras
  const harvest1 = await harvests.create({ name: 'Safra 2023', farmId: farm1.id });
  const harvest2 = await harvests.create({ name: 'Safra 2024', farmId: farm2.id });

  // Crie culturas
  await crops.create({ name: 'Soja', farmId: farm1.id, harvestId: harvest1.id });
  await crops.create({ name: 'Milho', farmId: farm2.id, harvestId: harvest2.id });

  await app.close();
}

bootstrap();
