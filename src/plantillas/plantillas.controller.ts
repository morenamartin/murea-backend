import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common'
import { PlantillasService } from './plantillas.service'
import { CrearPlantillaDto } from './dto/crear-plantilla.dto'
import { ActualizarPlantillaDto } from './dto/actualizar-plantilla.dto'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@UseGuards(JwtAuthGuard)
@Controller('plantillas')
export class PlantillasController {
    constructor(private readonly plantillasService: PlantillasService) { }

    @Get()
    obtenerTodas(@Request() req: any) {
        return this.plantillasService.obtenerTodas(req.user.id)
    }

    @Post()
    crear(@Request() req: any, @Body() dto: CrearPlantillaDto) {
        return this.plantillasService.crear(req.user.id, dto)
    }

    @Put(':id')
    actualizar(@Request() req: any, @Param('id') id: string, @Body() dto: ActualizarPlantillaDto) {
        return this.plantillasService.actualizar(id, req.user.id, dto)
    }

    @Delete(':id')
    eliminar(@Request() req: any, @Param('id') id: string) {
        return this.plantillasService.eliminar(id, req.user.id)
    }
}