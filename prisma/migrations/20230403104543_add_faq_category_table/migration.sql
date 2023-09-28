-- CreateTable
CREATE TABLE "FAQCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FAQCategory_id_key" ON "FAQCategory"("id");

-- AddForeignKey
ALTER TABLE "FAQ" ADD CONSTRAINT "FAQ_FAQCategoryId_fkey" FOREIGN KEY ("FAQCategoryId") REFERENCES "FAQCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
