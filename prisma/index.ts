import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
        username: 'alice123',
        name: 'Alice',
        email: 'alice@test.com',
        password: 'test',
    }
  })
  const allUsers = await prisma.user.findMany({
    include: {
        budgets: true,
        financialAccounts: true,
        goals: true,
        categories: true,
    }
  })
  console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })