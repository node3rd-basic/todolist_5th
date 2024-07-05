import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

async function main() {
    const allUsers = await prisma.users.findMany({
        include: {
            todo_items: true
        }
    })
    // console.log(allUsers)
    console.dir(allUsers, {depth: null})

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