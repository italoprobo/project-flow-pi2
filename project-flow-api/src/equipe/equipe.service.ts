import { Injectable } from '@nestjs/common';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipe } from './entities/equipe.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Usuario_equipe } from 'src/usuario_equipe/entities/usuario_equipe.entity';

@Injectable()
export class EquipeService {

  constructor(
    @InjectRepository(Equipe) private readonly equipeRepositorio: Repository<Equipe>,
    @InjectRepository(Usuario) private readonly usuarioRepositorio: Repository<Usuario>,
    @InjectRepository(Projeto) private readonly projetoRepositorio: Repository<Projeto>,
    @InjectRepository(Usuario_equipe) private readonly UsuarioEquipeRepositorio: Repository<Usuario_equipe>,
  ){}

  async createTeam(createEquipeDto: CreateEquipeDto) {
    try {
      const usuario: Usuario = await this.usuarioRepositorio.findOneBy({ id: createEquipeDto.responsavelId });
      const projeto: Projeto = await this.projetoRepositorio.findOneBy({ id: createEquipeDto.projetoId });
  
      if (usuario && projeto) {
        const team: Equipe = new Equipe();
        team.nome = createEquipeDto.nome;
        team.funcao = createEquipeDto.funcao;
        team.responsavel = usuario;
        team.projeto = projeto;
  
        const savedTeam: Equipe = await this.equipeRepositorio.save(team);
  
        const usuario_equipe: Usuario_equipe = new Usuario_equipe();
        usuario_equipe.usuarioId = createEquipeDto.responsavelId;
        usuario_equipe.equipeId = savedTeam.id;
        this.UsuarioEquipeRepositorio.save(usuario_equipe);
      }
    } catch (error) {
      console.error("Erro ao criar equipe:", error);
      throw error;
    }
  }
  

  findAllTeam(): Promise<Equipe[]> {
    return this.equipeRepositorio.find({ relations: ['projeto', 'responsavel'] });
  }

  viewTeam(id: number): Promise<Equipe> {
    return this.equipeRepositorio.findOne({ where: { id }, relations: ['projeto', 'responsavel'] });
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
