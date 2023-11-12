import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario_equipe } from "./entities/usuario_equipe.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario_equipe]), Usuario],
    providers: [],
    exports: []
})

export class Usuario_equipeModule {}