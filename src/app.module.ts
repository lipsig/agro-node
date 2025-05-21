import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProducersModule } from './producers/producer.module';
import { FarmModule } from './farms/farm.module';
import { CropModule } from './crops/crop.module';
import { HarvestModule } from './harvests/harvest.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env.example',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true, // carrega automaticamente todas as entidades registradas nos módulos
      synchronize: true, // para dev, gera/atualiza tabelas automaticamente
    }),
    ProducersModule,
    FarmModule,
    CropModule,
    HarvestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
