import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { TarefaModule } from './tarefa/tarefa.module';
import { Tarefa } from './tarefa/entities/tarefa.entity';
import { ProjetoModule } from './projeto/projeto.module';
import { Projeto } from './projeto/entities/projeto.entity';
import { EquipeModule } from './equipe/equipe.module';
import { Equipe } from './equipe/entities/equipe.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'nicolasgabriel',
      entities: [Usuario, Tarefa, Projeto, Equipe],
      database: 'project_flow_db',
      synchronize: true,
      logging: true,
    }),
    UsuarioModule,
    TarefaModule,
    ProjetoModule,
    EquipeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
