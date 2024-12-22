/*
  Warnings:

  - You are about to drop the column `dateOfBirthId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `managerId` on the `User` table. All the data in the column will be lost.
  - The primary key for the `Visa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `end_date` on the `Visa` table. All the data in the column will be lost.
  - You are about to drop the column `issuing_country` on the `Visa` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Visa` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Visa` table. All the data in the column will be lost.
  - You are about to drop the `DateOfBirth` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date_birth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Visa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuingCountry` to the `Visa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Visa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Visa" DROP CONSTRAINT "Visa_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dateOfBirthId",
DROP COLUMN "managerId",
ADD COLUMN     "date_birth" TEXT NOT NULL,
ADD COLUMN     "manager" JSONB,
ADD COLUMN     "visa" JSONB,
ALTER COLUMN "first_native_name" DROP NOT NULL,
ALTER COLUMN "is_remote_work" SET DEFAULT false,
ALTER COLUMN "last_native_name" DROP NOT NULL,
ALTER COLUMN "middle_native_name" DROP NOT NULL,
ALTER COLUMN "user_avatar" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Visa" DROP CONSTRAINT "Visa_pkey",
DROP COLUMN "end_date",
DROP COLUMN "issuing_country",
DROP COLUMN "start_date",
DROP COLUMN "userId",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "issuingCountry" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Visa_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Visa_id_seq";

-- DropTable
DROP TABLE "DateOfBirth";
