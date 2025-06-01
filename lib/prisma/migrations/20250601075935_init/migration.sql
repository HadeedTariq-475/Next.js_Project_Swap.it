/*
  Warnings:

  - You are about to drop the column `town` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "town",
ADD COLUMN     "city" TEXT;
