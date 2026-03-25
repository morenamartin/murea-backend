import { Controller, Post, Body, UseGuards, Request, Inject, forwardRef } from '@nestjs/common'
import { IaService } from './ia.service'
import { IsOptional, IsString } from 'class-validator'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { UsuariosService } from '../usuarios/usuarios.service'
import { PrismaService } from 'src/prisma/prisma.service'

class AnalizarFitDto {
    @IsString()
    descripcion: string
}

class GenerarCartaDto {
    @IsString()
    descripcion: string

    @IsString()
    tono: string

    @IsString()
    @IsOptional()
    plantillaId?: string
}

@UseGuards(JwtAuthGuard)
@Controller('ia')
export class IaController {
    constructor(
        private readonly iaService: IaService,
        @Inject(forwardRef(() => UsuariosService))
        private readonly usuariosService: UsuariosService,
        private readonly prisma: PrismaService,
    ) { }

    @Post('analizar-fit')
    async analizarFit(@Request() req: any, @Body() dto: AnalizarFitDto) {
        const usuario = await this.usuariosService.buscarPorId(req.user.id)
        return this.iaService.analizarFit(usuario, dto.descripcion)
    }

    @Post('generar-carta')
    async generarCarta(@Request() req: any, @Body() dto: GenerarCartaDto) {
        const usuario = await this.usuariosService.buscarPorId(req.user.id)

        let plantillaContenido: string | undefined
        if (dto.plantillaId) {
            const plantilla = await this.prisma.plantilla.findUnique({
                where: { id: dto.plantillaId },
            })
            plantillaContenido = plantilla?.contenido
        }

        return this.iaService.generarCarta(usuario, dto.descripcion, dto.tono, plantillaContenido)
    }
}