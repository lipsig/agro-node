import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // Removido o método @Get() para liberar a rota '/' para a dashboard estática
}
