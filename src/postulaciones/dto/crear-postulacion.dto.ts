import { IsString, IsOptional, IsEnum, IsArray, IsInt, IsDateString } from 'class-validator'
import { EstadoPostulacion } from '@prisma/client'

export class CrearPostulacionDto {
    @IsString()
    empresa: string

    @IsString()
    @IsOptional()
    logo?: string

    @IsString()
    rol: string

    @IsString()
    descripcion: string

    @IsString()
    @IsOptional()
    urlOriginal?: string

    @IsEnum(EstadoPostulacion)
    estado: EstadoPostulacion

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

    @IsOptional()
    carta?: {
        contenido: string
        tono: string
        plantillaId?: string
    }
}