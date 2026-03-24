import { IsEnum, IsInt, Min } from 'class-validator'
import { TipoMeta } from '@prisma/client'

export class CrearMetaDto {
    @IsEnum(TipoMeta)
    tipo: TipoMeta

    @IsInt()
    @Min(1)
    cantidad: number
}