import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CrearEntrevistaDto } from './dto/crear-entrevista.dto'
import { ActualizarEntrevistaDto } from './dto/actualizar-entrevista.dto'

@Injectable()
export class EntrevistasService {
    constructor(private prisma: PrismaService) { }

    async crear(userId: string, dto: CrearEntrevistaDto) {
        // Verificar que la postulacion pertenece al usuario
        const postulacion = await this.prisma.postulacion.findFirst({
            where: { id: dto.postulacionId, userId },
        })
        if (!postulacion) throw new NotFoundException('Postulación no encontrada')

        // Contar entrevistas existentes para asignar numero
        const cantidadExistentes = await this.prisma.entrevista.count({
            where: { postulacionId: dto.postulacionId },
        })

        // Si ya habia una, actualizamos la primera para que tenga numero 1
        if (cantidadExistentes === 1) {
            await this.prisma.entrevista.updateMany({
                where: { postulacionId: dto.postulacionId },
                data: { numero: 1 },
            })
        }

        const numero = cantidadExistentes === 0 ? null : cantidadExistentes + 1

        return this.prisma.entrevista.create({
            data: {
                ...dto,
                numero,
            },
        })
    }

    async obtenerPorPostulacion(postulacionId: string, userId: string) {
        const postulacion = await this.prisma.postulacion.findFirst({
            where: { id: postulacionId, userId },
        })
        if (!postulacion) throw new NotFoundException('Postulación no encontrada')

        return this.prisma.entrevista.findMany({
            where: { postulacionId },
            orderBy: { numero: 'asc' },
        })
    }

    async actualizar(id: string, userId: string, dto: ActualizarEntrevistaDto) {
        const entrevista = await this.prisma.entrevista.findFirst({
            where: { id },
            include: { postulacion: true },
        })
        if (!entrevista || entrevista.postulacion.userId !== userId) {
            throw new NotFoundException('Entrevista no encontrada')
        }

        return this.prisma.entrevista.update({
            where: { id },
            data: dto,
        })
    }

    async eliminar(id: string, userId: string) {
        const entrevista = await this.prisma.entrevista.findFirst({
            where: { id },
            include: { postulacion: true },
        })
        if (!entrevista || entrevista.postulacion.userId !== userId) {
            throw new NotFoundException('Entrevista no encontrada')
        }

        return this.prisma.entrevista.delete({ where: { id } })
    }
}