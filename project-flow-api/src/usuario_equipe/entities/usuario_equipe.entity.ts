import { Equipe } from "src/equipe/entities/equipe.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario_equipe {
    @PrimaryGeneratedColumn()
    id:number

    @Column({name: 'usuarioId', nullable: false})
    usuarioId: number
    
    @Column({name: 'equipeId', nullable: false})
    equipeId: number

    @ManyToOne(
        () => Usuario, (usuario) => usuario.usuario_equipe,
        )
        @JoinColumn({name: 'usuarioId', referencedColumnName: 'id'})
    usuario?: Usuario

    @ManyToOne(
        () => Equipe, (equipe) => equipe.usuario_equipe,
        )
        @JoinColumn({name: 'equipeId', referencedColumnName: 'id'})
    equipe?: Equipe
}