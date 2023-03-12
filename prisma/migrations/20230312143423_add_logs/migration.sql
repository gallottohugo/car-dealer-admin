-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recordId" INTEGER NOT NULL,
    "recordTitle" VARCHAR(128),
    "difference" JSON,
    "action" VARCHAR(128) NOT NULL,
    "resource" VARCHAR(128) NOT NULL,
    "userId" VARCHAR(128) NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);
