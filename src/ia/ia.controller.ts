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

class AnalizarCvDto {
    @IsString()
    @IsOptional()
    cv?: string
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

    @Post('analizar-cv')
    @UseGuards(JwtAuthGuard)
    async analizarCV(@Request() req: any, @Body() dto: AnalizarCvDto) {
        const usuario = await this.usuariosService.buscarPorId(req.user.id)
        const cvTexto = dto.cv || usuario.cvs?.[0]?.text || ''

        if (!cvTexto) {
            return { error: 'No hay texto de CV para analizar' }
        }

        const summary = await this.iaService.analizarCV(cvTexto)

        // Si tenemos un registro de CV, le guardamos el resumen
        const ultimoCv = usuario.cvs?.[0]
        if (ultimoCv) {
            await this.prisma.cv.update({
                where: { id: ultimoCv.id },
                data: { summary: summary as any }
            })
        }

        return summary
    }

    @Post('analizar-github')
    async analizarGithub(@Request() req: any) {
        const usuario = await this.usuariosService.buscarPorId(req.user.id)
        return this.iaService.analizarGithub(usuario.githubs?.[0]?.username || '')
    }

    @Post('analizar-linkedin')
    async analizarLinkedin(@Request() req: any) {
        const usuario = await this.usuariosService.buscarPorId(req.user.id)
        return this.iaService.analizarLinkedin(usuario.linkedins?.[0]?.rawText || '')
    }

    @Post('analizar-portfolio')
    async analizarPortfolio(@Request() req: any) {
        const usuario = await this.usuariosService.buscarPorId(req.user.id)
        return this.iaService.analizarPortfolio(usuario.portfolios?.[0]?.rawText || '')
    }
}