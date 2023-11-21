import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepositorio: Repository<Usuario>
  ) {}

  async createUser(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>{
    const { nome, senha, telefone, email } = createUsuarioDto

    const salt = await bcrypt.genSalt();
    const hashedSenha = await bcrypt.hash(senha, salt);

    const user = new Usuario();
    user.nome = nome
    user.senha = hashedSenha
    user.telefone = telefone
    user.email = email

    return this.usuarioRepositorio.save(user)
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

  async findByName(nome: string): Promise<Usuario | null> {
    try {
      const user = await this.usuarioRepositorio.findOne({ where: { nome } });
      return user || null;
    } catch (error) {
      console.error('Erro ao buscar usuário pelo nome:', error);
      return null;
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