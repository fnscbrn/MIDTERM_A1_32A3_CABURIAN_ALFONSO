import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { studentNumber, result } = await request.json()

    // Basic validation
    if (!studentNumber || !/^C\d+$/.test(studentNumber) || !result) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    // Check if player exists
    const player = await db.users.findUnique({ where: { studentNumber } })
    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 })
    }

    // Save game result
    const game = await db.games.create({
      data: {
        studentNumber,
        result,
        datePlayed: new Date()
      }
    })

    return NextResponse.json({ success: true, game })
  } catch (error) {
    console.error('Error saving game:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
