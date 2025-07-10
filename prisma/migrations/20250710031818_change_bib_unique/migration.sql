/*
  Warnings:

  - A unique constraint covering the columns `[bib]` on the table `Runner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Runner_bib_key" ON "Runner"("bib");
