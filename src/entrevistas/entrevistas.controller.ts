import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common'
import { EntrevistasService } from './entrevistas.service'
import { CrearEntrevistaDto } from './dto/crear-entrevista.dto'
import { ActualizarEntrevistaDto } from './dto/actualizar-entrevista.dto'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@UseGuards(JwtAuthGuard)
@Controller('entrevistas')
export class EntrevistasController {
    constructor(private readonly entrevistasService: EntrevistasService) { }

    @Post()
    crear(@Request() req: any, @Body() dto: CrearEntrevistaDto) {
        return this.entrevistasService.crear(req.user.id, dto)
    }

    @Get('postulacion/:postulacionId')
    obtenerPorPostulacion(@Request() req: any, @Param('postulacionId') postulacionId: string) {
        return this.entrevistasService.obtenerPorPostulacion(postulacionId, req.user.id)
    }

    @Put(':id')
    actualizar(@Request() req: any, @Param('id') id: string, @Body() dto: ActualizarEntrevistaDto) {
        return this.entrevistasService.actualizar(id, req.user.id, dto)
    }

    @Delete(':id')
    eliminar(@Request() req: any, @Param('id') id: string) {
        return this.entrevistasService.eliminar(id, req.user.id)
    }
}