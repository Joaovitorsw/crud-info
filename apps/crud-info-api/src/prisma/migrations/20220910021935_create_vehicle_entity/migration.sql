-- CreateTable
CREATE TABLE "Vehicle" (
    "vehicleID" SERIAL NOT NULL,
    "board" TEXT NOT NULL,
    "chassi" TEXT NOT NULL,
    "renavam" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "ano" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("vehicleID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_board_key" ON "Vehicle"("board");
