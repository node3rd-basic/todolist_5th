import prisma from "../conn/prismaClient.js"

export async function findByEmail(email) {
    return prisma.users.findFirst({
        where: { email },
    })
}

export async function saveAndId({ email, password, name, role }) {
    const user = await prisma.users.create({
        data: { email, password, name, role },
    })
    return user.id
}