import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
