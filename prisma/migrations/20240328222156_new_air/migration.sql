-- CreateTable
CREATE TABLE "caracter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player_name" TEXT NOT NULL,
    "caracter_name" TEXT NOT NULL,
    "experience_points" INTEGER DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
