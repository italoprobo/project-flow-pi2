import { type } from 'os'
import { Projeto } from 'src/projeto/entities/projeto.entity'
import { Tarefa } from 'src/tarefa/entities/tarefa.entity'
import { Usuario } from 'src/usuario/entities/usuario.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

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

    @OneToMany(() => Projeto, (projeto) => projeto.equipes)
    projeto: Projeto

    @OneToMany(() => Tarefa, (tarefa) => tarefa.equipe)
    tarefas: Tarefa[]
}
