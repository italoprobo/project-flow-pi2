import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
