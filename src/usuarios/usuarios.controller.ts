import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common'
import { UsuariosService } from './usuarios.service'
import { CrearUsuarioDto } from './dto/crear-usuario.dto'
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Post()
    crear(@Body() dto: CrearUsuarioDto) {
        return this.usuariosService.crear(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('perfil')
    obtenerPerfil(@Request() req: any) {
        return this.usuariosService.obtenerPerfil(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Put('perfil')
    actualizar(@Request() req: any, @Body() dto: ActualizarUsuarioDto) {
        return this.usuariosService.actualizar(req.user.id, dto)
    }
}