import { IsString, IsOptional } from 'class-validator'

export class ActualizarPlantillaDto {
    @IsString()
    @IsOptional()
    nombre?: string

    @IsString()
    @IsOptional()
    contenido?: string
}