import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CrearPlantillaDto } from './dto/crear-plantilla.dto'
import { ActualizarPlantillaDto } from './dto/actualizar-plantilla.dto'

@Injectable()
export class PlantillasService {
    constructor(private prisma: PrismaService) { }

    async obtenerTodas(userId: string) {
        return this.prisma.plantilla.findMany({
            where: {
                OR: [
                    { userId },
                    { esDefault: true },
                ],
            },
            orderBy: [
                { esDefault: 'desc' },
                { creadoEn: 'asc' },
            ],
        })
    }

    async crear(userId: string, dto: CrearPlantillaDto) {
        return this.prisma.plantilla.create({
            data: {
                ...dto,
                userId,
                esDefault: false,
            },
        })
    }

    async actualizar(id: string, userId: string, dto: ActualizarPlantillaDto) {
        const plantilla = await this.prisma.plantilla.findUnique({ where: { id } })
        if (!plantilla) throw new NotFoundException('Plantilla no encontrada')
        if (plantilla.esDefault) throw new ForbiddenException('No podés editar plantillas default')
        if (plantilla.userId !== userId) throw new ForbiddenException('No tenés permiso')

        return this.prisma.plantilla.update({
            where: { id },
            data: dto,
        })
    }

    async eliminar(id: string, userId: string) {
        const plantilla = await this.prisma.plantilla.findUnique({ where: { id } })
        if (!plantilla) throw new NotFoundException('Plantilla no encontrada')
        if (plantilla.esDefault) throw new ForbiddenException('No podés eliminar plantillas default')
        if (plantilla.userId !== userId) throw new ForbiddenException('No tenés permiso')

        return this.prisma.plantilla.delete({ where: { id } })
    }
}