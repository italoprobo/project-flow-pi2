import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario_equipe } from './entities/usuario_equipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Usuario_equipeService {

  constructor(
    @InjectRepository(Usuario_equipe)
    private readonly usuario_equipeRepositorio: Repository<Usuario_equipe>
  ) {}

  async findAllUser_Team(): Promise<Usuario_equipe[]> {
    return await this.usuario_equipeRepositorio.find();
  }
}