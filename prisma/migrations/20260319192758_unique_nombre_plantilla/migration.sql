/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `plantillas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "plantillas_nombre_key" ON "plantillas"("nombre");
