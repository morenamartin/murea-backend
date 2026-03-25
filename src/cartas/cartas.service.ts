import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CrearCartaDto } from './dto/crear-carta.dto'
import { ActualizarCartaDto } from './dto/actualizar-carta.dto'
import { IaService } from '../ia/ia.service'
import { UsuariosService } from '../usuarios/usuarios.service'

@Injectable()
export class CartasService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async crear(userId: string, dto: CrearCartaDto) {
        const postulacion = await this.prisma.postulacion.findFirst({
            where: { id: dto.postulacionId, userId },
        })
        if (!postulacion) throw new NotFoundException('Postulación no encontrada')

        return this.prisma.carta.create({
            data: dto,
        })
    }

    async obtenerPorPostulacion(postulacionId: string, userId: string) {
        const postulacion = await this.prisma.postulacion.findFirst({
            where: { id: postulacionId, userId },
        })
        if (!postulacion) throw new NotFoundException('Postulación no encontrada')

        return this.prisma.carta.findUnique({
            where: { postulacionId },
        })
    }

    async actualizar(postulacionId: string, userId: string, dto: ActualizarCartaDto) {
        await this.obtenerPorPostulacion(postulacionId, userId)

        return this.prisma.carta.update({
            where: { postulacionId },
            data: dto,
        })
    }
}