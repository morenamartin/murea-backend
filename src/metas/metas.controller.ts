import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common'
import { MetasService } from './metas.service'
import { CrearMetaDto } from './dto/crear-meta.dto'
import { ActualizarMetaDto } from './dto/actualizar-meta.dto'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@UseGuards(JwtAuthGuard)
@Controller('metas')
export class MetasController {
    constructor(private readonly metasService: MetasService) { }

    @Get()
    obtenerTodas(@Request() req: any) {
        return this.metasService.obtenerTodas(req.user.id)
    }

    @Post()
    crear(@Request() req: any, @Body() dto: CrearMetaDto) {
        return this.metasService.crear(req.user.id, dto)
    }

    @Put(':tipo')
    actualizar(@Request() req: any, @Param('tipo') tipo: string, @Body() dto: ActualizarMetaDto) {
        return this.metasService.actualizar(req.user.id, tipo, dto)
    }
}