import { Module } from '@nestjs/common'
import { PostulacionesController } from './postulaciones.controller'
import { PostulacionesService } from './postulaciones.service'
import { IaModule } from '../ia/ia.module'
import { UsuariosModule } from '../usuarios/usuarios.module'

@Module({
  imports: [IaModule, UsuariosModule],
  controllers: [PostulacionesController],
  providers: [PostulacionesService],
})
export class PostulacionesModule { }