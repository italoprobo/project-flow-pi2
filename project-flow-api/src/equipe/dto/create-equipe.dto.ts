import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateEquipeDto {

    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @MinLength(2, { message: 'Name must have at least 2 characters.' })
    funcao: string

}
