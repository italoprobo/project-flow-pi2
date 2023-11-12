import { Module } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { EquipeController } from './equipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipe } from './entities/equipe.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Usuario_equipe } from 'src/usuario_equipe/entities/usuario_equipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipe, Projeto, Usuario, Usuario_equipe])],
  controllers: [EquipeController],
  providers: [EquipeService],
})
export class EquipeModule {}
