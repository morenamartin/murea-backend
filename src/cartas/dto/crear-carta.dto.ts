import { IsString, IsOptional, IsEnum } from 'class-validator'
import { TonosCarta } from '@prisma/client'

export class CrearCartaDto {
    @IsString()
    postulacionId: string

    @IsString()
    contenido: string

    @IsEnum(TonosCarta)
    tono: TonosCarta

    @IsString()
    @IsOptional()
    plantillaId?: string
}