import { Injectable } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class ProjetoService {

  constructor(
    @InjectRepository(Projeto) private readonly projetoRepositorio: Repository<Projeto>,
    @InjectRepository(Usuario) private readonly usuarioRepositorio: Repository<Usuario>
  ){}
  
  async createProject(createProjetoDto: CreateProjetoDto): Promise<Projeto>{
    const usuario: Usuario = await this.usuarioRepositorio.findOneBy({id: createProjetoDto.responsavelId})

    if(usuario) {
      if (createProjetoDto.dt_inicio > createProjetoDto.dt_final) {
        throw new Error('Data final deve ser maior que data inicial')
      }
      const project: Projeto = new Projeto();
      project.nome = createProjetoDto.nome
      project.descricao = createProjetoDto.descricao
      project.dt_inicio = createProjetoDto.dt_inicio
      project.dt_final = createProjetoDto.dt_final
      project.responsavel = usuario
      return this.projetoRepositorio.save(project)
    }
  }

  findAllProject(): Promise<Projeto[]> {
    return this.projetoRepositorio.find({ relations: ['responsavel', 'tarefas'] });
  }

  viewProject(id: number): Promise<Projeto> {
    return this.projetoRepositorio.findOne({ where: { id }, relations: ['responsavel', 'tarefas'] });
  }

  async updateProject(idProjeto: number, updateProjetoDto: UpdateProjetoDto): Promise<Projeto> {
    const projeto = new Projeto()
    const responsavel: Usuario = await this.usuarioRepositorio.findOne({ where: { id: updateProjetoDto.responsavelId }, relations: ['equipeslideradas', 'projetosliderados', 'usuario_equipe'] })
    projeto.descricao = updateProjetoDto.descricao
    projeto.dt_final = updateProjetoDto.dt_final
    projeto.dt_inicio = updateProjetoDto.dt_inicio
    projeto.nome = updateProjetoDto.nome
    projeto.responsavel = responsavel
    projeto.id = idProjeto

    console.log(projeto);
    return this.projetoRepositorio.save(projeto)
}


  removeProject(id: number): Promise<{affected?: number}> {
    return this.projetoRepositorio.delete(id);
  }
}
