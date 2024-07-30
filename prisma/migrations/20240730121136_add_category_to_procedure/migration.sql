/*
  Warnings:

  - Added the required column `category` to the `procedures` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TYPE_CATEGORY" AS ENUM ('BUG', 'DESIGN', 'FEATURE', 'RESEARCH');

-- AlterTable
ALTER TABLE "procedures" ADD COLUMN     "category" "TYPE_CATEGORY" NOT NULL;
