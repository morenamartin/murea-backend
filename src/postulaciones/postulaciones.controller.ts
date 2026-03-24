import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common'
import { PostulacionesService } from './postulaciones.service'
import { CrearPostulacionDto } from './dto/crear-postulacion.dto'
import { ActualizarPostulacionDto } from './dto/actualizar-postulacion.dto'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@UseGuards(JwtAuthGuard)
@Controller('postulaciones')
export class PostulacionesController {
    constructor(private readonly postulacionesService: PostulacionesService) { }

    @Post()
    crear(@Request() req: any, @Body() dto: CrearPostulacionDto) {
        return this.postulacionesService.crear(req.user.id, dto)
    }

    @Get()
    obtenerTodas(@Request() req: any) {
        return this.postulacionesService.obtenerTodas(req.user.id)
    }

    @Get('estadisticas')
    obtenerEstadisticas(@Request() req: any) {
        return this.postulacionesService.obtenerEstadisticas(req.user.id)
    }

    @Get(':id')
    obtenerPorId(@Request() req: any, @Param('id') id: string) {
        return this.postulacionesService.obtenerPorId(id, req.user.id)
    }

    @Put(':id')
    actualizar(@Request() req: any, @Param('id') id: string, @Body() dto: ActualizarPostulacionDto) {
        return this.postulacionesService.actualizar(id, req.user.id, dto)
    }

    @Delete(':id')
    eliminar(@Request() req: any, @Param('id') id: string) {
        return this.postulacionesService.eliminar(id, req.user.id)
    }
}