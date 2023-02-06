/*
  Warnings:

  - You are about to drop the column `remark` on the `ncr` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ncr` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `ncr` table. All the data in the column will be lost.
  - Added the required column `re_mark` to the `ncr` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stats` to the `ncr` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjects` to the `ncr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT;

-- AlterTable
ALTER TABLE "ncr" DROP COLUMN "remark",
DROP COLUMN "status",
DROP COLUMN "subject",
ADD COLUMN     "re_mark" TEXT NOT NULL,
ADD COLUMN     "stats" TEXT NOT NULL,
ADD COLUMN     "subjects" TEXT NOT NULL;
