import { Module } from '@nestjs/common';
import { EntrevistasController } from './entrevistas.controller';
import { EntrevistasService } from './entrevistas.service';

@Module({
  controllers: [EntrevistasController],
  providers: [EntrevistasService]
})
export class EntrevistasModule {}
