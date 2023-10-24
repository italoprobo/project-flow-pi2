import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Equipe {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 50})
    nome: string

    @Column({length:50, nullable: true})
    funcao: string
    
}
