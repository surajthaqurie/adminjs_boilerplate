
-- DropIndex
DROP INDEX "GameCategory_name_key";

-- DropIndex
DROP INDEX "GameTypes_name_key";

-- DropIndex
DROP INDEX "Games_name_key";

-- DropIndex
DROP INDEX "Pages_name_key";

-- AlterTable
ALTER TABLE "FAQ" ALTER COLUMN "image_alternative_text" SET NOT NULL;

-- AlterTable
ALTER TABLE "FAQCategory" ALTER COLUMN "image_alternative_text" SET NOT NULL;

-- AlterTable
ALTER TABLE "GameTypes" ADD COLUMN     "cannonical_link" TEXT,
ADD COLUMN     "og_description" TEXT,
ADD COLUMN     "og_title" TEXT,
ADD COLUMN     "og_type" "OG_TYPE",
ADD COLUMN     "og_url" TEXT,
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "image_alternative_text" SET NOT NULL;

-- AlterTable
ALTER TABLE "Games" ALTER COLUMN "gallery_alternative_text" SET NOT NULL;

-- AlterTable
ALTER TABLE "Pages" ALTER COLUMN "image_alternative_text" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GameCategory_slug_key" ON "GameCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "GameTypes_slug_key" ON "GameTypes"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Games_slug_key" ON "Games"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Pages_slug_key" ON "Pages"("slug");
