import { Injectable } from '@nestjs/common'
import { UsuariosService } from '../usuarios/usuarios.service'

@Injectable()
export class AuthService {
    constructor(private usuarios: UsuariosService) { }

    async registrar(id: string, nombre: string, email: string) {
        const usuarioExistente = await this.usuarios.buscarPorEmail(email)
        if (usuarioExistente) return usuarioExistente

        return this.usuarios.crear({ id, nombre, email })
    }
}