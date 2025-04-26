-- CreateTable
CREATE TABLE "User" (
    "studentNumber" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentNumber" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "datePlayed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Game_studentNumber_fkey" FOREIGN KEY ("studentNumber") REFERENCES "User" ("studentNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);
