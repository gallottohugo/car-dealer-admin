/*
  Warnings:

  - Added the required column `apiKey` to the `dealers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dealers" ADD COLUMN     "apiKey" TEXT NOT NULL;
