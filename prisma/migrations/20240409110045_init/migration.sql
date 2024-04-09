/*
  Warnings:

  - You are about to drop the column `Description` on the `Forum` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Forum" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT;
