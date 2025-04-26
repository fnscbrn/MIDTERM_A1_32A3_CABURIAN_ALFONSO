import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data (optional, for clean reset)
  await prisma.game.deleteMany()
  await prisma.user.deleteMany()

  // Create test users
  await prisma.user.createMany({
    data: [
      { studentNumber: 'C12345', firstName: 'Alice', lastName: 'Smith' },
      { studentNumber: 'C23456', firstName: 'Bob', lastName: 'Johnson' },
      { studentNumber: 'C34567', firstName: 'Charlie', lastName: 'Brown' }
    ]
  })

  // Create test games
  await prisma.game.createMany({
    data: [
      { studentNumber: 'C12345', result: 'win' },
      { studentNumber: 'C12345', result: 'retried 2 times before win' },
      { studentNumber: 'C23456', result: 'loss' },
      { studentNumber: 'C34567', result: 'win' }
    ]
  })

  console.log('🌱 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
