import { ApiProperty } from '@nestjs/swagger';
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


export class LoginDto {

    @IsString()
    @MinLength(2, { message: 'Email deve ter ao menos 2 caracteres' })
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    senha: string;
}