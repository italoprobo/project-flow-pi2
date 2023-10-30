import { type } from 'os'
import { Usuario } from 'src/usuario/entities/usuario.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm'

@Entity()
export class Equipe {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 50})
    nome: string

    @Column({length:50, nullable: true})
    funcao: string

    @ManyToMany((type) => Usuario, (usuario) => usuario.equipes)
    membros: Usuario[]

    @ManyToOne(() => Usuario, (usuario) => usuario.equipeslideradas)
    responsavel: Usuario
}
