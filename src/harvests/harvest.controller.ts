import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { CreateHarvestDto, UpdateHarvestDto } from './dto/harvest.dto';

@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post()
  create(@Body() dto: CreateHarvestDto) {
    return this.harvestService.create(dto);
  }

  @Get()
  findAll() {
    return this.harvestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.harvestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHarvestDto) {
    return this.harvestService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.harvestService.remove(id);
  }
}
