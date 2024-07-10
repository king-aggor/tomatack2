-- CreateTable
CREATE TABLE "Farmer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "digital_address" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wholesaler" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "digital_address" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "Wholesaler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Retailer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "digital_address" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "Retailer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transporter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "digital_address" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "Transporter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "batch_no" SERIAL NOT NULL,
    "variety" TEXT NOT NULL,
    "harvest_date" TIMESTAMP(3) NOT NULL,
    "sold_date" TIMESTAMP(3) NOT NULL,
    "Price" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "wholesalerId" INTEGER,
    "retailerId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("batch_no")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_wholesalerId_fkey" FOREIGN KEY ("wholesalerId") REFERENCES "Wholesaler"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_retailerId_fkey" FOREIGN KEY ("retailerId") REFERENCES "Retailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
