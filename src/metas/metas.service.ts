import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CrearMetaDto } from './dto/crear-meta.dto'
import { ActualizarMetaDto } from './dto/actualizar-meta.dto'

@Injectable()
export class MetasService {
    constructor(private prisma: PrismaService) { }

    async obtenerTodas(userId: string) {
        return this.prisma.meta.findMany({
            where: { userId },
        })
    }

    async crear(userId: string, dto: CrearMetaDto) {
        return this.prisma.meta.create({
            data: {
                userId,
                tipo: dto.tipo,
                cantidad: dto.cantidad,
            },
        })
    }

    async actualizar(userId: string, tipo: string, dto: ActualizarMetaDto) {
        const meta = await this.prisma.meta.findFirst({
            where: { userId, tipo: tipo as any },
        })
        if (!meta) throw new NotFoundException('Meta no encontrada')

        return this.prisma.meta.update({
            where: { id: meta.id },
            data: { cantidad: dto.cantidad },
        })
    }
}