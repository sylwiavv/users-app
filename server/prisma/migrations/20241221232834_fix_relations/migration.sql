/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `building` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `citizenship` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirthId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_native_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_remote_work` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_native_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `managerId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middle_native_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skype` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_avatar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('EMPLOYEE', 'ADMIN', 'HR');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "building" TEXT NOT NULL,
ADD COLUMN     "citizenship" TEXT NOT NULL,
ADD COLUMN     "cnumber" TEXT NOT NULL,
ADD COLUMN     "dateOfBirthId" INTEGER NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "desk_number" INTEGER,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "first_native_name" TEXT NOT NULL,
ADD COLUMN     "is_remote_work" BOOLEAN NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "last_native_name" TEXT NOT NULL,
ADD COLUMN     "managerId" TEXT NOT NULL,
ADD COLUMN     "middle_native_name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'EMPLOYEE',
ADD COLUMN     "room" TEXT NOT NULL,
ADD COLUMN     "skype" TEXT NOT NULL,
ADD COLUMN     "user_avatar" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visa" (
    "id" SERIAL NOT NULL,
    "issuing_country" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "start_date" INTEGER NOT NULL,
    "end_date" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Visa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateOfBirth" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DateOfBirth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignInUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAuthenticated" BOOLEAN NOT NULL,

    CONSTRAINT "SignInUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DateOfBirth_userId_key" ON "DateOfBirth"("userId");

-- AddForeignKey
ALTER TABLE "Visa" ADD CONSTRAINT "Visa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
