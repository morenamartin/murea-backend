import { IsString, IsOptional, IsEnum, IsArray, IsInt, IsDateString } from 'class-validator'
import { EstadoPostulacion } from '@prisma/client'

export class ActualizarPostulacionDto {
    @IsEnum(EstadoPostulacion)
    @IsOptional()
    estado?: EstadoPostulacion

    @IsInt()
    @IsOptional()
    matchPorcentaje?: number

    @IsArray()
    @IsOptional()
    skillsMatch?: string[]

    @IsArray()
    @IsOptional()
    skillsFaltantes?: string[]

    @IsArray()
    @IsOptional()
    redFlags?: string[]

    @IsString()
    @IsOptional()
    veredictoIA?: string

    @IsArray()
    @IsOptional()
    tecnologias?: string[]

    @IsDateString()
    @IsOptional()
    fechaPostulacion?: string

    @IsString()
    @IsOptional()
    empresa?: string

    @IsString()
    @IsOptional()
    logo?: string

    @IsString()
    @IsOptional()
    rol?: string

    @IsString()
    @IsOptional()
    descripcion?: string

    @IsString()
    @IsOptional()
    urlOriginal?: string
}