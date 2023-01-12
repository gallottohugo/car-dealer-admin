/*
  Warnings:

  - A unique constraint covering the columns `[license]` on the table `cars` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cars_license_key" ON "cars"("license");
