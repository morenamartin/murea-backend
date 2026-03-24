import { IsString, IsOptional, IsEnum } from 'class-validator'
import { TonosCarta } from '@prisma/client'

export class ActualizarCartaDto {
    @IsString()
    @IsOptional()
    contenido?: string

    @IsEnum(TonosCarta)
    @IsOptional()
    tono?: TonosCarta
}