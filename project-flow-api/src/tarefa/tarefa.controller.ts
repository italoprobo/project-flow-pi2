import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/tarefa')
@ApiTags('tarefa')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Post()
  @ApiOperation({summary: 'Adicionar uma nova tarefa'})
  create(@Body() createTarefaDto: CreateTarefaDto) {
    return this.tarefaService.createTask(createTarefaDto);
  }

  @Get()
  @ApiOperation({summary: 'Listar todas as tarefas'})
  findAll() {
    return this.tarefaService.findAllTask();
  }

  @Get(':id')
  @ApiOperation({summary: 'Listar uma tarefa por id'})
  findOne(@Param('id') id: string) {
    return this.tarefaService.viewTask(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Atualizar tarefa'})
  update(@Param('id') id: string, @Body() updateTarefaDto: UpdateTarefaDto) {
    return this.tarefaService.updateTask(+id, updateTarefaDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Deletar tarefa'})
  remove(@Param('id') id: string) {
    return this.tarefaService.removeTask(+id);
  }
}
