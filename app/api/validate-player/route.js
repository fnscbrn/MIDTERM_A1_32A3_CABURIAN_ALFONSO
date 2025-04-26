import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const studentNumber = searchParams.get('studentNumber')

  // Check format: Must start with 'C' and be alphanumeric
  const validFormat = /^C\d+$/.test(studentNumber)
  if (!validFormat) {
    return Response.json({ valid: false }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { studentNumber }
  })

  return Response.json({ valid: !!user })
}
