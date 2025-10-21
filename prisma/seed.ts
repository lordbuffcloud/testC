import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create the three fixed decks
  await prisma.deck.upsert({
    where: { key: 'patrol' },
    update: {},
    create: {
      key: 'patrol',
      name: 'Patrol'
    }
  })

  await prisma.deck.upsert({
    where: { key: 'ec' },
    update: {},
    create: {
      key: 'ec',
      name: 'EC'
    }
  })

  await prisma.deck.upsert({
    where: { key: 'bdoc' },
    update: {},
    create: {
      key: 'bdoc',
      name: 'BDOC'
    }
  })

  console.log('Seeded three decks: Patrol, EC, BDOC')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
