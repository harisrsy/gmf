/*
  Warnings:

  - You are about to drop the column `re_mark` on the `ncr` table. All the data in the column will be lost.
  - You are about to drop the column `stats` on the `ncr` table. All the data in the column will be lost.
  - You are about to drop the column `subjects` on the `ncr` table. All the data in the column will be lost.
  - Added the required column `remark` to the `ncr` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `ncr` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `ncr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ncr" DROP COLUMN "re_mark",
DROP COLUMN "stats",
DROP COLUMN "subjects",
ADD COLUMN     "remark" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL;
