import { Module } from '@nestjs/common'
import { CartasController } from './cartas.controller'
import { CartasService } from './cartas.service'
import { IaModule } from '../ia/ia.module'
import { UsuariosModule } from '../usuarios/usuarios.module'

@Module({
  imports: [IaModule, UsuariosModule],
  controllers: [CartasController],
  providers: [CartasService],
})
export class CartasModule { }