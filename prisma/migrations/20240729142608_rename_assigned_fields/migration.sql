/*
  Warnings:

  - You are about to drop the column `assinedId` on the `procedures` table. All the data in the column will be lost.
  - You are about to drop the column `imporance` on the `procedures` table. All the data in the column will be lost.
  - Added the required column `assignedId` to the `procedures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `importance` to the `procedures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "procedures" DROP CONSTRAINT "procedures_assinedId_fkey";

-- AlterTable
ALTER TABLE "procedures" DROP COLUMN "assinedId",
DROP COLUMN "imporance",
ADD COLUMN     "assignedId" TEXT NOT NULL,
ADD COLUMN     "importance" "TYPE_PRIORITY" NOT NULL;

-- AddForeignKey
ALTER TABLE "procedures" ADD CONSTRAINT "procedures_assignedId_fkey" FOREIGN KEY ("assignedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
