import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/equipe')
@ApiTags('equipe')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Post()
  @ApiOperation({summary: 'Adicionar uma nova equipe'})
  create(@Body() createEquipeDto: CreateEquipeDto) {
    return this.equipeService.createTeam(createEquipeDto);
  }

  @Get()
  @ApiOperation({summary: 'Listar todas as equipes'})
  findAll() {
    return this.equipeService.findAllTeam();
  }

  @Get(':id')
  @ApiOperation({summary: 'Listar uma equipe por id'})
  findOne(@Param('id') id: string) {
    return this.equipeService.viewTeam(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Atualizar equipe'})
  update(@Param('id') id: string, @Body() updateEquipeDto: UpdateEquipeDto) {
    return this.equipeService.updateTeam(+id, updateEquipeDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Deletar equipe'})
  remove(@Param('id') id: string) {
    return this.equipeService.removeTeam(+id);
  }
}
