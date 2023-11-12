import { Equipe } from "src/equipe/entities/equipe.entity";
import { Tarefa } from "src/tarefa/entities/tarefa.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Projeto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50})
    nome: string;

    @Column({type: 'varchar', length: 75})
    descricao: string;

    @Column({type: 'timestamptz'})
    dt_inicio: Date;

    @Column({type: 'timestamptz',  nullable: true})
    dt_final: Date;

    @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.projetosliderados)
    responsavel: Usuario

    @OneToMany(() => Tarefa, (tarefa) => tarefa.projeto, { cascade: true })
    tarefas: Tarefa[]

    @OneToMany(() => Equipe, (equipe) => equipe.projeto, { cascade: true })
    equipes: Equipe[]
    project: Promise<Usuario>;
}
