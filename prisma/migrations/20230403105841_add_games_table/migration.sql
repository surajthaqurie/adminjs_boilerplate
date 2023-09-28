-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" JSONB,
    "description" TEXT NOT NULL,
    "orders" INTEGER,
    "og_title" TEXT,
    "meta_title" TEXT,
    "og_description" TEXT,
    "meta_description" TEXT,
    "keywords" TEXT,
    "canonical_link" TEXT,
    "og_url" TEXT,
    "og_type" "OG_TYPE",
    "slug" TEXT NOT NULL,
    "gallery" JSONB,
    "youtube_link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Games_id_key" ON "Games"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Games_name_key" ON "Games"("name");
