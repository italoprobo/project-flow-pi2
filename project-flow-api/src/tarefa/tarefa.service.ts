import { Injectable } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { Repository } from 'typeorm';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Equipe } from 'src/equipe/entities/equipe.entity';

@Injectable()
export class TarefaService {

  constructor(
    @InjectRepository(Tarefa) private readonly tarefaRepositorio: Repository<Tarefa>,
    @InjectRepository(Projeto) private readonly projetoRepositorio: Repository<Projeto>,
    @InjectRepository(Equipe) private readonly equipeRepositorio: Repository<Equipe>,
  ) { }

  async createTask(createTarefaDto: CreateTarefaDto): Promise<Tarefa> {

    const projeto: Projeto = await this.projetoRepositorio.findOneBy({ id: createTarefaDto.ProjetoId });
    const equipe: Equipe = await this.equipeRepositorio.findOneBy({ id: createTarefaDto.EquipeId });

    if (equipe && projeto) {
      const tarefa: Tarefa = new Tarefa();
      tarefa.nome = createTarefaDto.nome
      tarefa.descricao = createTarefaDto.descricao
      tarefa.dt_inicio = createTarefaDto.dt_inicio
      tarefa.dt_final = createTarefaDto.dt_final
      tarefa.tempo_previsto = createTarefaDto.tempo_previsto
      tarefa.importancia = createTarefaDto.importancia
      tarefa.isDone = createTarefaDto.isDone
      tarefa.equipe = equipe
      tarefa.projeto = projeto
      return this.tarefaRepositorio.save(tarefa)
    }
  }

  findAllTask(): Promise<Tarefa[]> {
    return this.tarefaRepositorio.find({ relations: ['projeto', 'equipe'] });
  }

  viewTask(id: number): Promise<Tarefa> {
    return this.tarefaRepositorio.findOne({ where: { id } });
  }

  async findTarefasByEquipeId(equipeId: number): Promise<Tarefa[]> {
    return this.tarefaRepositorio.find({
      where: { equipe: { id: equipeId } },
      relations: ['projeto'], 
    });
  }

  updateTask(id: number, updateTarefaDto: UpdateTarefaDto): Promise<Tarefa> {
    const task: Tarefa = new Tarefa();
    task.nome = updateTarefaDto.nome
    task.descricao = updateTarefaDto.descricao
    task.dt_inicio = updateTarefaDto.dt_inicio
    task.dt_final = updateTarefaDto.dt_final
    task.importancia = updateTarefaDto.importancia
    task.tempo_previsto = updateTarefaDto.tempo_previsto
    task.isDone = updateTarefaDto.isDone
    task.id = id
    return this.tarefaRepositorio.save(task);
  }

  removeTask(id: number): Promise<{ affected?: number }> {
    return this.tarefaRepositorio.delete(id);
  }
}
