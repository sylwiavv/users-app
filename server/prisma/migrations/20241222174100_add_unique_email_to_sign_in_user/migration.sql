/*
  Warnings:

  - You are about to drop the column `isAuthenticated` on the `SignInUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SignInUser" DROP COLUMN "isAuthenticated";

-- CreateTable
CREATE TABLE "UserSignInData" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserSignInData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSignInData_email_key" ON "UserSignInData"("email");

-- AddForeignKey
ALTER TABLE "UserSignInData" ADD CONSTRAINT "UserSignInData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
