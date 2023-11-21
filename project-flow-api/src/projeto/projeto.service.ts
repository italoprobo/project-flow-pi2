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

  async updateProject(idUsuario: number, updateProjetoDto: UpdateProjetoDto): Promise<Projeto | null> {
    // Encontre o projeto existente pelo ID
    const project: Projeto | undefined = await this.projetoRepositorio.findOneBy({id: idUsuario});

    if (project) {
        // Encontre o usuário pelo ID
        const usuario: Usuario | undefined = await this.usuarioRepositorio.findOneBy({id: updateProjetoDto.responsavelId});

        if (usuario) {
            // Atualize as propriedades do projeto com os valores do DTO
            project.nome = updateProjetoDto.nome;
            project.descricao = updateProjetoDto.descricao;
            project.dt_inicio = updateProjetoDto.dt_inicio;
            project.dt_final = updateProjetoDto.dt_final;
            project.responsavel = usuario;

            // Salve as alterações no projeto existente
            return this.projetoRepositorio.save(project);
        } else {
            // Trate o caso em que o usuário não foi encontrado
            return null;
        }
    } else {
        // Trate o caso em que o projeto não foi encontrado
        return null;
    }
}


  removeProject(id: number): Promise<{affected?: number}> {
    return this.projetoRepositorio.delete(id);
  }
}
