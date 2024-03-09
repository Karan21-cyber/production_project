import prisma from "../prisma";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const getUserDataById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      fname: true,
      lname: true,
      email: true,
      phone: true,
      address: true,
      image: true,
      verified: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};
