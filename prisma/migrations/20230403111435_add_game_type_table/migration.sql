/*
  Warnings:

  - Added the required column `game_type` to the `Games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" ADD COLUMN     "game_type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GameTypes" (
    "id" TEXT NOT NULL,
    "image" JSONB,
    "description" TEXT NOT NULL,
    "orders" INTEGER,
    "meta_title" TEXT,
    "keywords" TEXT,
    "meta_description" TEXT,
    "slug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GameTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameTypes_id_key" ON "GameTypes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GameTypes_name_key" ON "GameTypes"("name");

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_game_type_fkey" FOREIGN KEY ("game_type") REFERENCES "GameTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
