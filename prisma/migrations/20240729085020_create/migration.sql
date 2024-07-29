-- CreateEnum
CREATE TYPE "TYPE_STATUS" AS ENUM ('TODO', 'ON_GOING', 'DONE', 'WAITING');

-- CreateEnum
CREATE TYPE "TYPE_IMPORANCE" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastNmae" TEXT NOT NULL,
    "avatar_url" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proceures" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "status" "TYPE_STATUS" NOT NULL,
    "assinedId" TEXT NOT NULL,
    "imporance" "TYPE_IMPORANCE" NOT NULL,

    CONSTRAINT "proceures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "proceures" ADD CONSTRAINT "proceures_assinedId_fkey" FOREIGN KEY ("assinedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
