/*
  Warnings:

  - You are about to drop the column `dateOfBirthId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `managerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `DateOfBirth` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateOfBirth` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Visa" DROP CONSTRAINT "Visa_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dateOfBirthId",
DROP COLUMN "managerId",
ADD COLUMN     "dateOfBirth" TEXT NOT NULL,
ALTER COLUMN "first_native_name" DROP NOT NULL,
ALTER COLUMN "last_native_name" DROP NOT NULL,
ALTER COLUMN "middle_native_name" DROP NOT NULL;

-- DropTable
DROP TABLE "DateOfBirth";
