import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { LoginDto } from 'src/usuario/dto/login.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsuarioService
  ) { }

  async login(loginDto: LoginDto): Promise<Usuario> {
    const usuario: Usuario | undefined = await this.userService.findByEmail(loginDto.email).catch(() => undefined)

    const isMatch = await compare(loginDto.senha, usuario.senha || '')

    if (!usuario || !isMatch) {
      throw Error("E-mail inválido")
    }

    return usuario
  }

}
