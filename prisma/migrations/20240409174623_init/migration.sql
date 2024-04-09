/*
  Warnings:

  - You are about to alter the column `description` on the `Forum` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100000)`.

*/
-- AlterTable
ALTER TABLE "Forum" ALTER COLUMN "description" SET DATA TYPE VARCHAR(100000);
