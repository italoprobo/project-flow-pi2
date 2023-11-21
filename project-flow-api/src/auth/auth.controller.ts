import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { LoginDto } from 'src/usuario/dto/login.dto';
import { Public } from './public.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/auth')
@ApiTags('autenticacao')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usuarioService: UsuarioService,
    ){}

    @Post('registrar')
    async registar(@Body() registerUserDto: CreateUsuarioDto){
        return this.usuarioService.createUser(registerUserDto)
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginUserDto: LoginDto){
        return this.authService.login(loginUserDto)
    }
}
