import { Module, forwardRef } from '@nestjs/common'
import { IaService } from './ia.service'
import { IaController } from './ia.controller'
import { UsuariosModule } from '../usuarios/usuarios.module'

@Module({
  imports: [forwardRef(() => UsuariosModule)],
  controllers: [IaController],
  providers: [IaService],
  exports: [IaService],
})
export class IaModule { }