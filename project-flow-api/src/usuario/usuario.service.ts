import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepositorio: Repository<Usuario>,
  ) {}

  createUser(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>{
    const usuario: Usuario = new Usuario();
    usuario.nome = createUsuarioDto.nome
    usuario.telefone = createUsuarioDto.telefone
    usuario.email = createUsuarioDto.email
    usuario.senha = createUsuarioDto.senha
    return this.usuarioRepositorio.save(usuario)
  }

  async findAllUser(): Promise<Usuario[]> {
    return await this.usuarioRepositorio.find();
  }

  async viewUser(id: number): Promise<Usuario> {
    try{
      return this.usuarioRepositorio.findOneBy({id})
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  updateUser(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario: Usuario = new Usuario();
    usuario.nome = updateUsuarioDto.nome
    usuario.telefone = updateUsuarioDto.telefone
    usuario.email = updateUsuarioDto.email
    usuario.senha = updateUsuarioDto.senha
    usuario.id = id
    return this.usuarioRepositorio.save(usuario)
  }

  removeUser(id: number): Promise<{ affected?: number} > {
    return this.usuarioRepositorio.delete(id)
  }
}
