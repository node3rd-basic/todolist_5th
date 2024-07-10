import prisma from "../common/prisma.js";

export async function findUser(email) {
  return await prisma.User.findFirst({
    where: {
      email
    }
  })
}

export async function pushUser(newUser) {
  const createUser = await prisma.User.create({
      data: {email: newUser.email,
            password: newUser.password,
            name: newUser.name,
            role: newUser.role,}}      
  )
  return createUser
}


