import { IsString, IsOptional, IsBoolean } from 'class-validator'

export class CrearPlantillaDto {
    @IsString()
    nombre: string

    @IsString()
    contenido: string

    @IsBoolean()
    @IsOptional()
    esDefault?: boolean
}