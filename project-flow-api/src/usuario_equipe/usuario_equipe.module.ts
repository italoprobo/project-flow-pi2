import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario_equipe } from "./entities/usuario_equipe.entity";
import { Usuario_equipeService } from "./usuario_equipe.service";
import { Usuario_equipeController } from "./usuario_equipe.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario_equipe])],
    controllers: [Usuario_equipeController],
    providers: [Usuario_equipeService],
    exports: [Usuario_equipeService]
})

export class Usuario_equipeModule {}