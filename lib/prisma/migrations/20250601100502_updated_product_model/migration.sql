/*
  Warnings:

  - The values [EXCHANGE,BOTH] on the enum `ProductType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `price` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductType_new" AS ENUM ('BUY', 'DONATE');
ALTER TABLE "Product" ALTER COLUMN "type" TYPE "ProductType_new" USING ("type"::text::"ProductType_new");
ALTER TYPE "ProductType" RENAME TO "ProductType_old";
ALTER TYPE "ProductType_new" RENAME TO "ProductType";
DROP TYPE "ProductType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "exchange" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
