import { Injectable } from '@nestjs/common';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipe } from './entities/equipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EquipeService {

  @InjectRepository(Equipe) private readonly equipeRepositorio: Repository<Equipe>

  createTeam(createEquipeDto: CreateEquipeDto): Promise<Equipe> {
    const team: Equipe = new Equipe()
    team.nome = createEquipeDto.nome
    team.funcao = createEquipeDto.funcao
    team.membros = createEquipeDto.membros
    team.responsavel = createEquipeDto.responsavel
    team.projeto = createEquipeDto.projeto
    team.tarefas = createEquipeDto.tarefas
    return this.equipeRepositorio.save(team)
  }

  findAllTeam(): Promise<Equipe[]> {
    return this.equipeRepositorio.find();
  }

  viewTeam(id: number): Promise<Equipe> {
    return this.equipeRepositorio.findOneBy({id});
  }

  updateTeam(id: number, updateEquipeDto: UpdateEquipeDto): Promise<Equipe> {
    const team: Equipe = new Equipe()
    team.funcao = updateEquipeDto.funcao
    team.nome = updateEquipeDto.nome
    team.id = id
    return this.equipeRepositorio.save(team);
  }

  removeTeam(id: number): Promise<{ affected?: number }> {
    return this.equipeRepositorio.delete(id);
  }
}
