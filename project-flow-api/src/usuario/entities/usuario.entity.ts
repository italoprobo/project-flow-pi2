import { type } from "os";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Equipe } from "src/equipe/entities/equipe.entity";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    nome: string;
  
    @Column({ type: 'varchar', length: 11 })
    telefone: string;
  
    @Column({ type: 'varchar', length: 50 })
    email: string;
  
    @Column({ type: 'varchar' })
    senha: string;

    @OneToMany(() => Equipe, (equipe) => equipe.responsavel)
    equipeslideradas: Equipe[]

    @ManyToMany((type) => Equipe, (equipe) => equipe.membros, {
        cascade: true,
    })
    @JoinTable()
    equipes: Equipe[]
}
