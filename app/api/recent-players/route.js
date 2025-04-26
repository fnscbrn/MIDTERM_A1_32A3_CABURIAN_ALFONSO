import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000)

  const recentPlays = await prisma.game.findMany({
    where: {
      datePlayed: {
        gte: threeHoursAgo
      }
    },
    select: {
      studentNumber: true
    },
    distinct: ['studentNumber']
  })

  return Response.json(recentPlays)
}
