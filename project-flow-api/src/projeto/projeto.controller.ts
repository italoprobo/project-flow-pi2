import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/projeto')
@ApiTags('projeto')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  @ApiOperation({summary: 'Adicionar um novo projeto'})
  create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetoService.createProject(createProjetoDto);
  }

  @Get()
  @ApiOperation({summary: 'Listar todos os projetos'})
  findAll() {
    return this.projetoService.findAllProject();
  }

  @Get(':id')
  @ApiOperation({summary: 'Listar um projeto por id'})
  findOne(@Param('id') id: string) {
    return this.projetoService.viewProject(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Atualizar projeto'})
  update(@Param('id') id: string, @Body() updateProjetoDto: UpdateProjetoDto) {
    return this.projetoService.updateProject(+id, updateProjetoDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Deletar projeto'})
  remove(@Param('id') id: string) {
    return this.projetoService.removeProject(+id);
  }
}
