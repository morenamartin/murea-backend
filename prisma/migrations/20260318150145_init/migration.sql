-- CreateEnum
CREATE TYPE "EstadoPostulacion" AS ENUM ('postulado', 'entrevista', 'en_espera', 'aceptado', 'rechazado', 'descartado', 'para_despues');

-- CreateEnum
CREATE TYPE "TipoEntrevista" AS ENUM ('hr', 'tecnica', 'manager', 'desafio', 'otro');

-- CreateEnum
CREATE TYPE "TonosCarta" AS ENUM ('formal', 'cercano', 'directo', 'creativo');

-- CreateEnum
CREATE TYPE "TipoMeta" AS ENUM ('diaria', 'semanal');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cvTexto" TEXT,
    "cvUrl" TEXT,
    "portfolioUrl" TEXT,
    "portfolioContenido" TEXT,
    "githubUsername" TEXT,
    "githubData" JSONB,
    "linkedinData" JSONB,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postulaciones" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "logo" TEXT,
    "rol" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "urlOriginal" TEXT,
    "estado" "EstadoPostulacion" NOT NULL,
    "matchPorcentaje" INTEGER,
    "skillsMatch" TEXT[],
    "skillsFaltantes" TEXT[],
    "redFlags" TEXT[],
    "veredictoIA" TEXT,
    "tecnologias" TEXT[],
    "fechaPostulacion" TIMESTAMP(3),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "postulaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entrevistas" (
    "id" TEXT NOT NULL,
    "postulacionId" TEXT NOT NULL,
    "numero" INTEGER,
    "tipo" "TipoEntrevista" NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "link" TEXT,
    "direccion" TEXT,
    "notas" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entrevistas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartas" (
    "id" TEXT NOT NULL,
    "postulacionId" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "tono" "TonosCarta" NOT NULL,
    "plantillaId" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cartas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plantillas" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "nombre" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "esDefault" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plantillas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metas" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tipo" "TipoMeta" NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "metas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cartas_postulacionId_key" ON "cartas"("postulacionId");

-- CreateIndex
CREATE UNIQUE INDEX "metas_userId_tipo_key" ON "metas"("userId", "tipo");

-- AddForeignKey
ALTER TABLE "postulaciones" ADD CONSTRAINT "postulaciones_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrevistas" ADD CONSTRAINT "entrevistas_postulacionId_fkey" FOREIGN KEY ("postulacionId") REFERENCES "postulaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartas" ADD CONSTRAINT "cartas_postulacionId_fkey" FOREIGN KEY ("postulacionId") REFERENCES "postulaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartas" ADD CONSTRAINT "cartas_plantillaId_fkey" FOREIGN KEY ("plantillaId") REFERENCES "plantillas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantillas" ADD CONSTRAINT "plantillas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metas" ADD CONSTRAINT "metas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
