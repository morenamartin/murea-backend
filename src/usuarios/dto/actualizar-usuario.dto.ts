import { IsString, IsOptional } from 'class-validator'

export class ActualizarUsuarioDto {
    @IsString()
    @IsOptional()
    nombre?: string

    @IsString()
    @IsOptional()
    cvTexto?: string

    @IsString()
    @IsOptional()
    cvUrl?: string

    @IsString()
    @IsOptional()
    portfolioUrl?: string

    @IsString()
    @IsOptional()
    portfolioContenido?: string

    @IsString()
    @IsOptional()
    githubUsername?: string
}