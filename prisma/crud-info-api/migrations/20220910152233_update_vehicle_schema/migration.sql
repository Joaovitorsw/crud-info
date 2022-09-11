/*
  Warnings:

  - You are about to drop the column `created_at` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `ano` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "ano",
ADD COLUMN     "ano" VARCHAR(4) NOT NULL;
