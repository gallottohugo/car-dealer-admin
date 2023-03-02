/*
  Warnings:

  - Added the required column `property` to the `car_properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `car_properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car_properties" ADD COLUMN     "property" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
