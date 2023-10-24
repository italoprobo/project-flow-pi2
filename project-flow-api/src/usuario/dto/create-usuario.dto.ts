import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUsuarioDto {

    @IsString()
    @MinLength(2, { message: 'Nome deve ter ao menos 2 caracteres' })
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    @MinLength(8, { message: 'O telefone deve ter ao menos 8 caracteres.' })
    telefone: string;

    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email.' })
    email: string;

    @IsNotEmpty()
    @Matches(passwordRegEx, {
      message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
    })
    senha: string;
}
