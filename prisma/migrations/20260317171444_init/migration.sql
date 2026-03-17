-- CreateEnum
CREATE TYPE "FlightDirection" AS ENUM ('PARIS_TO_COTONOU', 'COTONOU_TO_PARIS');

-- CreateEnum
CREATE TYPE "FlightStatus" AS ENUM ('SCHEDULED', 'BOARDING', 'IN_FLIGHT', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ParcelStatus" AS ENUM ('RECEIVED_PARIS', 'IN_FLIGHT', 'ARRIVED_COTONOU', 'AVAILABLE');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('COSMETICS', 'NUTRITION', 'WELLNESS');

-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "ContactSubject" AS ENUM ('LOGISTICS', 'SHOPPING', 'STUDIES', 'TRACKING', 'OTHER');

-- CreateTable
CREATE TABLE "flights" (
    "id" TEXT NOT NULL,
    "direction" "FlightDirection" NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "origin" VARCHAR(100) NOT NULL,
    "destination" VARCHAR(100) NOT NULL,
    "availableSpots" INTEGER NOT NULL DEFAULT 0,
    "priceEur" INTEGER NOT NULL,
    "priceFcfa" INTEGER NOT NULL,
    "status" "FlightStatus" NOT NULL DEFAULT 'SCHEDULED',
    "notes" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parcels" (
    "id" TEXT NOT NULL,
    "trackingCode" VARCHAR(20) NOT NULL,
    "senderName" VARCHAR(100) NOT NULL,
    "senderPhone" VARCHAR(20) NOT NULL,
    "recipientName" VARCHAR(100) NOT NULL,
    "recipientPhone" VARCHAR(20) NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "status" "ParcelStatus" NOT NULL DEFAULT 'RECEIVED_PARIS',
    "currentNote" TEXT,
    "flightId" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parcels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parcel_status_logs" (
    "id" TEXT NOT NULL,
    "parcelId" TEXT NOT NULL,
    "status" "ParcelStatus" NOT NULL,
    "note" TEXT,
    "loggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parcel_status_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" VARCHAR(300) NOT NULL,
    "priceFcfa" INTEGER NOT NULL,
    "priceEur" INTEGER,
    "category" "ProductCategory" NOT NULL,
    "imageUrl" VARCHAR(500) NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "stockQuantity" INTEGER,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "excerpt" VARCHAR(500) NOT NULL,
    "content" TEXT NOT NULL,
    "coverImageUrl" VARCHAR(500),
    "seoTitle" VARCHAR(70),
    "seoDescription" VARCHAR(160),
    "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_messages" (
    "id" TEXT NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "subject" "ContactSubject" NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "flights_departureDate_idx" ON "flights"("departureDate");

-- CreateIndex
CREATE INDEX "flights_status_idx" ON "flights"("status");

-- CreateIndex
CREATE INDEX "flights_direction_idx" ON "flights"("direction");

-- CreateIndex
CREATE UNIQUE INDEX "parcels_trackingCode_key" ON "parcels"("trackingCode");

-- CreateIndex
CREATE INDEX "parcels_status_idx" ON "parcels"("status");

-- CreateIndex
CREATE INDEX "parcels_flightId_idx" ON "parcels"("flightId");

-- CreateIndex
CREATE INDEX "parcel_status_logs_parcelId_idx" ON "parcel_status_logs"("parcelId");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_category_idx" ON "products"("category");

-- CreateIndex
CREATE INDEX "products_isActive_inStock_idx" ON "products"("isActive", "inStock");

-- CreateIndex
CREATE INDEX "products_isFeatured_idx" ON "products"("isFeatured");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_status_publishedAt_idx" ON "articles"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "contact_messages_isRead_idx" ON "contact_messages"("isRead");

-- CreateIndex
CREATE INDEX "contact_messages_createdAt_idx" ON "contact_messages"("createdAt");

-- AddForeignKey
ALTER TABLE "parcels" ADD CONSTRAINT "parcels_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flights"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcel_status_logs" ADD CONSTRAINT "parcel_status_logs_parcelId_fkey" FOREIGN KEY ("parcelId") REFERENCES "parcels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
