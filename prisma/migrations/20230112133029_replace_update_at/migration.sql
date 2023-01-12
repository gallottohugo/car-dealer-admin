/*
  Warnings:

  - You are about to drop the column `updateAt` on the `about_us` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `buckets` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `dealers` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `social_networks` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "about_us" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "buckets" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "car_properties" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "dealers" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "images" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "services" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "social_networks" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
