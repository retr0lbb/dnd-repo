/*
  Warnings:

  - You are about to drop the column `player_name` on the `caracter` table. All the data in the column will be lost.
  - Added the required column `playerId` to the `caracter` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pass" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_caracter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caracter_name" TEXT NOT NULL,
    "experience_points" INTEGER DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "playerId" TEXT NOT NULL,
    CONSTRAINT "caracter_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_caracter" ("caracter_name", "created_at", "experience_points", "id") SELECT "caracter_name", "created_at", "experience_points", "id" FROM "caracter";
DROP TABLE "caracter";
ALTER TABLE "new_caracter" RENAME TO "caracter";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "player_email_key" ON "player"("email");
