import { Injectable } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjetoService {

  constructor(
    @InjectRepository(Projeto) private readonly projetoRepositorio: Repository<Projeto>
  ){}
  
  createProject(createProjetoDto: CreateProjetoDto): Promise<Projeto>{
    const project: Projeto = new Projeto();
    project.nome = createProjetoDto.nome
    project.descricao = createProjetoDto.descricao
    project.dt_inicio = createProjetoDto.dt_inicio
    project.dt_final = createProjetoDto.dt_final
    return this.projetoRepositorio.save(project)
  }

  findAllProject(): Promise<Projeto[]> {
    return this.projetoRepositorio.find();
  }

  viewProject(id: number): Promise<Projeto> {
    return this.projetoRepositorio.findOneBy({id});
  }

  updateProject(id: number, updateProjetoDto: UpdateProjetoDto): Promise<Projeto> {
    const project: Projeto = new Projeto();
    project.nome = updateProjetoDto.nome
    project.descricao = updateProjetoDto.descricao
    project.dt_inicio = updateProjetoDto.dt_inicio
    project.dt_final = updateProjetoDto.dt_final
    project.id = id
    return this.projetoRepositorio.save(project)
  }

  removeProject(id: number): Promise<{affected?: number}> {
    return this.projetoRepositorio.delete(id);
  }
}
