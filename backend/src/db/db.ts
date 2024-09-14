import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function dbConnect() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.log('Error while connecting to db.');
  }
}

dbConnect();

export default prisma;
