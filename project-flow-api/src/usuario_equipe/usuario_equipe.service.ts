import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario_equipe } from './entities/usuario_equipe.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioEquipeDto } from './dto/create-usuario_equipe.dto';

@Injectable()
export class Usuario_equipeService {

  constructor(
    @InjectRepository(Usuario_equipe)
    private readonly usuario_equipeRepositorio: Repository<Usuario_equipe>
  ) {}

  async findAllUser_Team(): Promise<Usuario_equipe[]> {
    return await this.usuario_equipeRepositorio.find();
  }

  addMember(creatUsuario_EquipeDto: CreateUsuarioEquipeDto) {
    const usuario_equipe: Usuario_equipe = new Usuario_equipe();
    usuario_equipe.usuarioId = creatUsuario_EquipeDto.usuarioId;
    usuario_equipe.equipeId = creatUsuario_EquipeDto.equipeId;
    this.usuario_equipeRepositorio.save(usuario_equipe)
  }
}