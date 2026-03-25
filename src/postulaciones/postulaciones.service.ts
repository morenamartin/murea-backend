import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CrearPostulacionDto } from './dto/crear-postulacion.dto'
import { ActualizarPostulacionDto } from './dto/actualizar-postulacion.dto'

@Injectable()
export class PostulacionesService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async crear(userId: string, dto: CrearPostulacionDto) {
        return this.prisma.postulacion.create({
            data: {
                ...dto,
                userId,
            },
        })
    }

    async obtenerTodas(userId: string) {
        return this.prisma.postulacion.findMany({
            where: { userId },
            include: {
                entrevistas: true,
                carta: true,
            },
            orderBy: { creadoEn: 'desc' },
        })
    }

    async obtenerPorId(id: string, userId: string) {
        const postulacion = await this.prisma.postulacion.findFirst({
            where: { id, userId },
            include: {
                entrevistas: {
                    orderBy: { numero: 'asc' },
                },
                carta: true,
            },
        })
        if (!postulacion) throw new NotFoundException('Postulación no encontrada')
        return postulacion
    }

    async actualizar(id: string, userId: string, dto: ActualizarPostulacionDto) {
        await this.obtenerPorId(id, userId)
        return this.prisma.postulacion.update({
            where: { id },
            data: dto,
        })
    }

    async eliminar(id: string, userId: string) {
        await this.obtenerPorId(id, userId)
        return this.prisma.postulacion.delete({
            where: { id },
        })
    }

    async obtenerEstadisticas(userId: string) {
        const postulaciones = await this.prisma.postulacion.findMany({
            where: { userId },
            select: { estado: true },
        })

        return postulaciones.reduce((acc, p) => {
            acc[p.estado] = (acc[p.estado] || 0) + 1
            return acc
        }, {} as Record<string, number>)
    }
}