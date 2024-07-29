/*
  Warnings:

  - You are about to drop the `proceures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "proceures" DROP CONSTRAINT "proceures_assinedId_fkey";

-- DropTable
DROP TABLE "proceures";

-- CreateTable
CREATE TABLE "procedures" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "status" "TYPE_STATUS" NOT NULL,
    "assinedId" TEXT NOT NULL,
    "imporance" "TYPE_PRIORITY" NOT NULL,

    CONSTRAINT "procedures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "procedures" ADD CONSTRAINT "procedures_assinedId_fkey" FOREIGN KEY ("assinedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
