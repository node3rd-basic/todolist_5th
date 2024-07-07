import prisma from "../common/prisma.js";

export async function findOne(email) {
    return await prisma.User.findFirst({
        where: {
            email
        }
    })
}


export async function findOneById(id) {
    return await prisma.User.findUnique({
        where: {
            id
        }
    })
}

export async function save(user) {
    const savedUser = await prisma.User.create( {
        data: {
            email: user.email,
            password: user.password,
            role: user.role,
            name: user.name
        }
    })
    return savedUser
}