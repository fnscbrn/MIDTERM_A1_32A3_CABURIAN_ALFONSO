import db from '@/lib/db'; // Adjust if your DB file is elsewhere
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await db.users.findMany()
  return NextResponse.json(users)
}

export async function POST(request) {
  const { studentNumber, firstName, lastName } = await request.json()

  if (!studentNumber.startsWith('C') || !/^\w+$/.test(studentNumber)) {
    return NextResponse.json({ error: 'Invalid student number' }, { status: 400 })
  }

  const existing = await db.users.findUnique({ where: { studentNumber } })
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const user = await db.users.create({
    data: { studentNumber, firstName, lastName },
  })

  return NextResponse.json(user)
}
