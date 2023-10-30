import { Equipe } from "src/equipe/entities/equipe.entity";
import { Projeto } from "src/projeto/entities/projeto.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

export enum Importancia{
    BAIXA,
    MEDIA,
    ALTA,
}

@Entity()
export class Tarefa {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 75 })
    nome: string;

    @Column({type: 'varchar', length: 150, nullable: true})
    descricao: string
  
    @Column({ type: 'timestamptz' })
    dt_inicio: Date;
  
    @Column({ type: 'timestamptz', nullable: true })
    dt_final: Date;
  
    @Column({ type: 'timestamptz' })
    tempo_previsto: Date;

    @Column({type: 'enum', enum: Importancia})
    importancia: Importancia;

    @Column({type: 'int', width: 1})
    isDone: number;

    @ManyToOne(() => Projeto, (projeto) => projeto.tarefas)
    projeto: Projeto

    @ManyToOne(() => Equipe, (equipe) => equipe.tarefas)
    equipe: Equipe
}
