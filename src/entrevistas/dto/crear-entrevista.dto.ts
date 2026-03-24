import { IsString, IsOptional, IsEnum, IsInt, IsDateString } from 'class-validator'
import { TipoEntrevista } from '@prisma/client'

export class CrearEntrevistaDto {
    @IsString()
    postulacionId: string

    @IsInt()
    @IsOptional()
    numero?: number

    @IsEnum(TipoEntrevista)
    tipo: TipoEntrevista

    @IsDateString()
    fecha: string

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