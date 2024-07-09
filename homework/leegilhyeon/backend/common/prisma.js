import { PrismaClient } from '@prisma/client'

export default new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
})

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })