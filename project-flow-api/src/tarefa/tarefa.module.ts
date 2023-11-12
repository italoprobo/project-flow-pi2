import { Module } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { Equipe } from 'src/equipe/entities/equipe.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefa, Equipe, Projeto])],
  controllers: [TarefaController],
  providers: [TarefaService],
})
export class TarefaModule {}
