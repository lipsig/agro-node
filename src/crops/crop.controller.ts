import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Controller('crops')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Post()
  create(@Body() dto: CreateCropDto) {
    return this.cropService.create(dto);
  }

  @Get()
  findAll() {
    return this.cropService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCropDto) {
    return this.cropService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropService.remove(id);
  }
}
