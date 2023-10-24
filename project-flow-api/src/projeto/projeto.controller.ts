import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Controller('api/v1/projeto')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetoService.createProject(createProjetoDto);
  }

  @Get()
  findAll() {
    return this.projetoService.findAllProject();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projetoService.viewProject(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjetoDto: UpdateProjetoDto) {
    return this.projetoService.updateProject(+id, updateProjetoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projetoService.removeProject(+id);
  }
}
