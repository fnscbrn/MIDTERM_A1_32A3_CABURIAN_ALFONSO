import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  const where = {}
  if (startDate && endDate) {
    where.datePlayed = {
      gte: new Date(startDate),
      lte: new Date(endDate)
    }
  }

  const games = await db.games.findMany({
    where,
    orderBy: { datePlayed: 'desc' }
  })

  return NextResponse.json(games)
}
