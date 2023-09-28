-- CreateEnum
CREATE TYPE "OG_TYPE" AS ENUM ('WEBSITE', 'MOBILE');

-- CreateTable
CREATE TABLE "Pages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" JSONB,
    "description" TEXT NOT NULL,
    "og_title" TEXT,
    "meta_title" TEXT,
    "og_description" TEXT,
    "meta_description" TEXT,
    "keywords" TEXT,
    "canonical_link" TEXT,
    "og_url" TEXT,
    "og_type" "OG_TYPE",
    "slug" TEXT NOT NULL,
    "sections" JSONB,
    "meta_box" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pages_id_key" ON "Pages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pages_name_key" ON "Pages"("name");
