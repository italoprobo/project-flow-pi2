import { Controller, Post, Body, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { LoginDto } from 'src/usuario/dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entities/usuario.entity';

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

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LoginDto): Promise<Usuario> {
        return await this.authService.login(loginDto)
    }   
}
