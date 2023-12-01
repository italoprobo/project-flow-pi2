import { type } from "os";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Equipe } from "src/equipe/entities/equipe.entity";
import { Projeto } from "src/projeto/entities/projeto.entity";
import * as bcrypt from 'bcrypt'
import { Usuario_equipe} from "src/usuario_equipe/entities/usuario_equipe.entity";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    nome: string;
  
    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;
  
    @Column({ type: 'varchar' })
    senha: string;
    
    @Column({ type: 'varchar' })
    cargo: string;

    async validatePassword(senha: string): Promise<boolean> {
        return bcrypt.compare(senha, this.senha)
    }

    @OneToMany(() => Equipe, (equipe) => equipe.responsavel)
    equipeslideradas: Equipe[]

    @OneToMany(() => Projeto, (projeto: Projeto) => projeto.responsavel)
    projetosliderados: Projeto[]

    @OneToMany(() => Usuario_equipe, (usuario_equipe) => usuario_equipe.usuario)
    usuario_equipe?: Usuario_equipe[]
}
