import { type } from 'os'
import { Projeto } from 'src/projeto/entities/projeto.entity'
import { Tarefa } from 'src/tarefa/entities/tarefa.entity'
import { Usuario } from 'src/usuario/entities/usuario.entity'
import { Usuario_equipe } from 'src/usuario_equipe/entities/usuario_equipe.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany, JoinTable } from 'typeorm'

@Entity()
export class Equipe {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 50, unique: true})
    nome: string

    @Column({length:50, nullable: true})
    funcao: string

    @ManyToOne(() => Usuario, (usuario) => usuario.equipeslideradas)
    responsavel: Usuario

    @ManyToOne(() => Projeto, (projeto) => projeto.equipes)
    projeto: Projeto

    @OneToMany(() => Usuario_equipe, (usuario_equipe) => usuario_equipe.equipe, { cascade: true })
    usuario_equipe?: Usuario_equipe[]

    @OneToMany(() => Tarefa, (tarefa) => tarefa.equipe, { cascade: true })
    tarefas: Tarefa[]
}
