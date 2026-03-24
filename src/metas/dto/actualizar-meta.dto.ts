import { IsInt, Min } from 'class-validator'

export class ActualizarMetaDto {
    @IsInt()
    @Min(1)
    cantidad: number
}