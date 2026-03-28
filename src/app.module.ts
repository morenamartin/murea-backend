import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { UsuariosModule } from './usuarios/usuarios.module'
import { PostulacionesModule } from './postulaciones/postulaciones.module'
import { EntrevistasModule } from './entrevistas/entrevistas.module'
import { CartasModule } from './cartas/cartas.module'
import { PlantillasModule } from './plantillas/plantillas.module'
import { MetasModule } from './metas/metas.module'
import { IaModule } from './ia/ia.module'
import { StorageModule } from './storage/storage.module'
import { AuthModule } from './auth/auth.module'
import { CvModule } from './cv/cv.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsuariosModule,
    PostulacionesModule,
    EntrevistasModule,
    CartasModule,
    PlantillasModule,
    MetasModule,
    IaModule,
    StorageModule,
    AuthModule,
    CvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }