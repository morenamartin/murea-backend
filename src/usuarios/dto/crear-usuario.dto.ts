import { IsEmail, IsString, IsOptional } from 'class-validator'

export class CrearUsuarioDto {
    @IsString()
    id: string

    @IsString()
    nombre: string

    @IsEmail()
    email: string
}