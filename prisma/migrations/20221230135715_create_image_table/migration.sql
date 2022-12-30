-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
