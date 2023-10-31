import { type } from "os";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Equipe } from "src/equipe/entities/equipe.entity";
import { Projeto } from "src/projeto/entities/projeto.entity";
import * as bcrypt from 'bcrypt'

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

    async validatePassword(senha: string): Promise<boolean> {
        return bcrypt.compare(senha, this.senha)
    }

    @OneToMany(() => Equipe, (equipe) => equipe.responsavel)
    equipeslideradas: Equipe[]

    @OneToMany(() => Projeto, (projeto) => projeto.responsavel)
    projetosliderados: Projeto[]

    @ManyToMany((type) => Equipe, (equipe) => equipe.membros, {
        cascade: true,
    })
    @JoinTable()
    equipes: Equipe[]
}
