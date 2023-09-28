-- CreateTable
CREATE TABLE "TwoFactorAuthentication" (
    "id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorAuthentication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorAuthentication_id_key" ON "TwoFactorAuthentication"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorAuthentication_userId_key" ON "TwoFactorAuthentication"("userId");

-- AddForeignKey
ALTER TABLE "TwoFactorAuthentication" ADD CONSTRAINT "TwoFactorAuthentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
