import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';

@Controller('equipe')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Post()
  create(@Body() createEquipeDto: CreateEquipeDto) {
    return this.equipeService.createTeam(createEquipeDto);
  }

  @Get()
  findAll() {
    return this.equipeService.findAllTeam();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipeService.viewTeam(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipeDto: UpdateEquipeDto) {
    return this.equipeService.updateTeam(+id, updateEquipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipeService.removeTeam(+id);
  }
}
