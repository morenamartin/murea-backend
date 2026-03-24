import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common'
import { CartasService } from './cartas.service'
import { CrearCartaDto } from './dto/crear-carta.dto'
import { ActualizarCartaDto } from './dto/actualizar-carta.dto'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@UseGuards(JwtAuthGuard)
@Controller('cartas')
export class CartasController {
    constructor(private readonly cartasService: CartasService) { }

    @Post()
    crear(@Request() req: any, @Body() dto: CrearCartaDto) {
        return this.cartasService.crear(req.user.id, dto)
    }

    @Get('postulacion/:postulacionId')
    obtenerPorPostulacion(@Request() req: any, @Param('postulacionId') postulacionId: string) {
        return this.cartasService.obtenerPorPostulacion(postulacionId, req.user.id)
    }

    @Put('postulacion/:postulacionId')
    actualizar(@Request() req: any, @Param('postulacionId') postulacionId: string, @Body() dto: ActualizarCartaDto) {
        return this.cartasService.actualizar(postulacionId, req.user.id, dto)
    }
}