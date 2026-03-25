import { Module } from '@nestjs/common'
import { CartasController } from './cartas.controller'
import { CartasService } from './cartas.service'

@Module({
  controllers: [CartasController],
  providers: [CartasService],
})
export class CartasModule { }