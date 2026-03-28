/*
  Warnings:

  - You are about to drop the column `cvTexto` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `cvUrl` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `githubData` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `githubUsername` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinData` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioContenido` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioUrl` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "cvTexto",
DROP COLUMN "cvUrl",
DROP COLUMN "githubData",
DROP COLUMN "githubUsername",
DROP COLUMN "linkedinData",
DROP COLUMN "portfolioContenido",
DROP COLUMN "portfolioUrl";

-- CreateTable
CREATE TABLE "Cv" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "fileUrl" TEXT,
    "text" TEXT,
    "summary" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GithubProfile" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rawData" JSONB,
    "summary" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkedinProfile" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "file" TEXT,
    "rawText" TEXT,
    "summary" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinkedinProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "rawText" TEXT,
    "summary" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cv" ADD CONSTRAINT "Cv_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubProfile" ADD CONSTRAINT "GithubProfile_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkedinProfile" ADD CONSTRAINT "LinkedinProfile_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
