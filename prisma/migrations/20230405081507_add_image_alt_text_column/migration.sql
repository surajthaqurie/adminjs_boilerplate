-- AlterTable
ALTER TABLE "FAQ" ADD COLUMN     "image_alternative_text" TEXT;

-- AlterTable
ALTER TABLE "FAQCategory" ADD COLUMN     "image_alternative_text" TEXT;

-- AlterTable
ALTER TABLE "GameTypes" ADD COLUMN     "image_alternative_text" TEXT;

-- AlterTable
ALTER TABLE "Games" ADD COLUMN     "gallery_alternative_text" TEXT,
ADD COLUMN     "image_alternative_text" TEXT;

-- AlterTable
ALTER TABLE "Pages" ADD COLUMN     "image_alternative_text" TEXT;
