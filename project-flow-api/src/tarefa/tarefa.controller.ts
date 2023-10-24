import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';

@Controller('api/v1/tarefa')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Post()
  create(@Body() createTarefaDto: CreateTarefaDto) {
    return this.tarefaService.createTask(createTarefaDto);
  }

  @Get()
  findAll() {
    return this.tarefaService.findAllTask();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarefaService.viewTask(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTarefaDto: UpdateTarefaDto) {
    return this.tarefaService.updateTask(+id, updateTarefaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarefaService.removeTask(+id);
  }
}
