/*
  Warnings:

  - Changed the type of `imporance` on the `proceures` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TYPE_PRIORITY" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "proceures" DROP COLUMN "imporance",
ADD COLUMN     "imporance" "TYPE_PRIORITY" NOT NULL;

-- DropEnum
DROP TYPE "TYPE_IMPORANCE";
