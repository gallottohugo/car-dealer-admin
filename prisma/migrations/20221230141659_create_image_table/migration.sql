/*
  Warnings:

  - You are about to drop the column `bucket` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `s3Key` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "bucket",
DROP COLUMN "s3Key";
