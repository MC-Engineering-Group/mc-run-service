-- CreateTable
CREATE TABLE "Key" (
    "id" SERIAL NOT NULL,
    "nama_key" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "expired_date" TIMESTAMP(3) NOT NULL,
    "is_trial" BOOLEAN NOT NULL,
    "max_hit" INTEGER NOT NULL,
    "no_limit" BOOLEAN NOT NULL,
    "hit_used" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Key_key_key" ON "Key"("key");
