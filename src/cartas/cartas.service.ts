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
        private ia: IaService,
        private usuarios: UsuariosService,
    ) { }

    async crear(userId: string, dto: CrearCartaDto) {
        const postulacion = await this.prisma.postulacion.findFirst({
            where: { id: dto.postulacionId, userId },
        })
        if (!postulacion) throw new NotFoundException('Postulación no encontrada')

        // Traemos el usuario completo para armar el perfil
        const usuario = await this.usuarios.buscarPorId(userId)

        // Si eligió plantilla la buscamos
        let plantillaContenido: string | undefined
        if (dto.plantillaId) {
            const plantilla = await this.prisma.plantilla.findUnique({
                where: { id: dto.plantillaId },
            })
            plantillaContenido = plantilla?.contenido
        }

        // Llamamos a la IA para generar la carta
        const contenido = await this.ia.generarCarta(
            usuario,
            postulacion.descripcion,
            dto.tono,
            plantillaContenido,
        )

        return this.prisma.carta.create({
            data: {
                postulacionId: dto.postulacionId,
                tono: dto.tono,
                plantillaId: dto.plantillaId,
                contenido,
            },
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