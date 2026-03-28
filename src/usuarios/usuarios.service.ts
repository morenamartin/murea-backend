import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CrearUsuarioDto } from './dto/crear-usuario.dto'
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto'
import { IaService } from '../ia/ia.service'

@Injectable()
export class UsuariosService {
    constructor(
        private prisma: PrismaService,
        private ia: IaService,
    ) { }

    async crear(dto: CrearUsuarioDto) {
        return this.prisma.usuario.create({
            data: dto,
        })
    }

    async buscarPorId(id: string) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { id },
            include: {
                cvs: true,
                githubs: true,
                linkedins: true,
                portfolios: true,
            },
        })
        if (!usuario) throw new NotFoundException('Usuario no encontrado')
        return usuario
    }

    async buscarPorEmail(email: string) {
        return this.prisma.usuario.findUnique({
            where: { email },
        })
    }

    async actualizar(id: string, dto: ActualizarUsuarioDto) {
        // Actualizamos el perfil primero
        const usuario = await this.prisma.usuario.update({
            where: { id },
            data: dto,
        })

        // Si actualizó alguna fuente del perfil recalculamos los gaps
        const fuentesActualizadas = ['cvTexto', 'portfolioContenido', 'githubUsername', 'linkedinData']
        const actualizoFuente = fuentesActualizadas.some(fuente => dto[fuente] !== undefined)

        if (actualizoFuente) {
            const gaps = await this.ia.analizarGaps(usuario)
            await this.prisma.usuario.update({
                where: { id },
                data: { gaps },
            })
        }

        return this.prisma.usuario.findUnique({ where: { id } })
    }

    async obtenerPerfil(id: string) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { id },
            include: {
                metas: true,
                plantillas: true,
            },
        })
        if (!usuario) throw new NotFoundException('Usuario no encontrado')
        return usuario
    }



}