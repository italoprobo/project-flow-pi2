import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from './jwt-payload';
import { Usuario } from "src/usuario/entities/usuario.entity";
import { UsuarioService } from "src/usuario/usuario.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor (private userService: UsuarioService) {
        super({
            secretOrKey: 'chave',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false
        })
    }

    async validate(payload: JwtPayload): Promise<Usuario> {
        const {email} = payload
        const user = await this.userService.findByEmail(email)

        if(!user) {
            throw new UnauthorizedException();
        }

        return user
    }
}