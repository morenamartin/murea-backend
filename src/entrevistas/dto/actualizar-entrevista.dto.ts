import { IsString, IsOptional, IsEnum, IsInt, IsDateString } from 'class-validator'
import { TipoEntrevista } from '@prisma/client'

export class ActualizarEntrevistaDto {
    @IsInt()
    @IsOptional()
    numero?: number

    @IsEnum(TipoEntrevista)
    @IsOptional()
    tipo?: TipoEntrevista

    @IsDateString()
    @IsOptional()
    fecha?: string

    @IsString()
    @IsOptional()
    link?: string

    @IsString()
    @IsOptional()
    direccion?: string

    @IsString()
    @IsOptional()
    notas?: string
}