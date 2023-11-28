import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]),  JwtModule.register({})],
  controllers: [UsuarioController],
  providers: [UsuarioService, AuthService, JwtStrategy],
  exports: [UsuarioService]
})
export class UsuarioModule {}
