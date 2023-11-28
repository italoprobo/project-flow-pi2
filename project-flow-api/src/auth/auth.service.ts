import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginDto } from 'src/usuario/dto/login.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsuarioService,
    private jwtService: JwtService
  ) { }

  async login(email: string, senha: string): Promise<any> {
    const usuario: Usuario | undefined = await this.userService.findByEmail(email).catch(() => undefined)

    const isMatch = await compare(senha, usuario.senha || '')

    if (!usuario || !isMatch) {
      throw Error("E-mail inválido")
    }

    const dados = []
    dados.push(await this.gerarToken(usuario))
    dados.push(usuario)

    return dados
  }

  async gerarToken(payload: Usuario) {
    const accessToken = this.jwtService.sign(
      { email: payload.email },
      {
        secret: 'sua-chave',
        expiresIn: '30s',
      },
    );

    const refreshToken = this.jwtService.sign(
      { email: payload.email },
      {
        secret: 'sua-chave-refresh',
        expiresIn: '60s',
      },
    );
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async reautenticar(body) {
    const payload: Usuario = await this.verificarRefreshToken(body);
    return this.gerarToken(payload);
  }

  private async verificarRefreshToken(body) {
    const refreshToken = body.refresh_token;

    if (!refreshToken) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const email = this.jwtService.decode(refreshToken)['email'];
    const usuario = await this.userService.findByEmail(email);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: 'sua-chave-refresh',
      });
      return usuario;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }
}
