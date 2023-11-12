import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUsuarioEquipeDto {
    @IsNotEmpty()
    @IsNumber()
    usuarioId: number

    @IsNotEmpty()
    @IsNumber()
    equipeId: number
}