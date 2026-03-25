import { forwardRef, Module } from '@nestjs/common'
import { UsuariosController } from './usuarios.controller'
import { UsuariosService } from './usuarios.service'
import { IaModule } from '../ia/ia.module'

@Module({
  imports: [forwardRef(() => IaModule)],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule { }