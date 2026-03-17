import { db, FlightDirection, FlightStatus, ProductCategory } from '../src/lib/db'

async function main() {
  console.log('🌱 Seeding SEZY database...')

  // ─── Vols de démonstration ─────────────────────────────────────────────────
  const flights = [
    {
      direction: FlightDirection.PARIS_TO_COTONOU,
      departureDate: new Date('2026-04-15T10:00:00Z'),
      arrivalDate: new Date('2026-04-15T22:00:00Z'),
      origin: 'Paris Charles de Gaulle',
      destination: 'Cotonou Cadjehoun',
      availableSpots: 50,
      priceEur: 2000,    // 20€
      priceFcfa: 10000,
      status: FlightStatus.SCHEDULED,
      notes: 'Places disponibles',
    },
    {
      direction: FlightDirection.COTONOU_TO_PARIS,
      departureDate: new Date('2026-04-20T08:00:00Z'),
      arrivalDate: new Date('2026-04-20T18:00:00Z'),
      origin: 'Cotonou Cadjehoun',
      destination: 'Paris Charles de Gaulle',
      availableSpots: 30,
      priceEur: 2000,
      priceFcfa: 10000,
      status: FlightStatus.SCHEDULED,
    },
  ]

  for (const f of flights) {
    await db.flight.create({ data: f })
  }

  // ─── Produits de démonstration ─────────────────────────────────────────────
  const products = [
    {
      name: 'Maca Bio 500g',
      slug: 'maca-bio-500g',
      description: 'Poudre de Maca biologique du Pérou...',
      shortDescription: 'Énergie et vitalité naturelle',
      priceFcfa: 25000,
      priceEur: 3800,
      category: ProductCategory.NUTRITION,
      imageUrl: 'https://res.cloudinary.com/dummy/image/upload/v1/maca-bio.jpg',
      inStock: true,
      isFeatured: true,
    },
    {
      name: 'Baies de Goji 250g',
      slug: 'baies-de-goji-250g',
      description: 'Baies de Goji séchées, riches en antioxydants...',
      shortDescription: 'Antioxydants naturels premium',
      priceFcfa: 18000,
      priceEur: 2800,
      category: ProductCategory.NUTRITION,
      imageUrl: 'https://res.cloudinary.com/dummy/image/upload/v1/baies-goji.jpg',
      inStock: true,
      isFeatured: true,
    },
  ]

  for (const p of products) {
    await db.product.create({ data: p })
  }

  // ─── Colis de démonstration (pour tester le tracking) ──────────────────────
  const demoColis = await db.parcel.create({
    data: {
      trackingCode: 'SEZY-2026-0001',
      senderName: 'Marie Dupont',
      senderPhone: '+33612345678',
      recipientName: 'Jean Koffi',
      recipientPhone: '+22901234567',
      weightKg: 5.5,
      status: 'RECEIVED_PARIS',
      currentNote: 'Colis bien reçu à notre dépôt Paris.',
    },
  })

  await db.parcelStatusLog.create({
    data: {
      parcelId: demoColis.id,
      status: 'RECEIVED_PARIS',
      note: 'Colis enregistré en dépôt Paris',
    },
  })

  console.log('✅ Seed terminé avec succès')
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
