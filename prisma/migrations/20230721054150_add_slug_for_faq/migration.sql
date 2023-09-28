
-- AlterTable
ALTER TABLE "FAQ" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FAQCategory" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Games" ALTER COLUMN "image_alternative_text" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FAQ_slug_key" ON "FAQ"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FAQCategory_slug_key" ON "FAQCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_key_key" ON "Settings"("key");
