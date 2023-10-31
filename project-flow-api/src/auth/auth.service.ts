import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/usuario/dto/login.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsuarioService,
        private readonly jwtService: JwtService,
      ) {}

      async login(LoginDto: LoginDto) {
        const { nome, senha } = LoginDto;
    
        const user = await this.usersService.findByName(nome);
    
        if (!user) {
          throw new UnauthorizedException('Invalid username or password');
        }
    
        const passwordIsValid = await user.validatePassword(senha);
    
        if (!passwordIsValid) {
          throw new UnauthorizedException('Invalid username or password');
        }
    
        const payload = { sub: user.id, username: user.nome };
        const accessToken = await this.jwtService.signAsync(payload);
    
        return { access_token: accessToken };
      }

      async validateUser(nome: string, senha: string): Promise<any> {
        const user = await this.usersService.findByName(nome);
        if (user && (await user.validatePassword(senha))) {
          const { senha, ...result } = user;
          return result;
        }
        return null;
      }
}
