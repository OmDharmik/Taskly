import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db/db';
import { userSignin, userSignup } from '../validation';

dotenv.config();

const router: Express = express();
router.use(express.json());

router.post('/signup', async (req: Request, res: Response) => {
  const body = userSignup.safeParse(req.body);
  const user = body?.data;

  const userExist = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
  });

  if (userExist) {
    return res.json({
      msg: 'User already exists',
    });
  }

  await prisma.user.create({
    data: {
      name: user!.name,
      email: user!.email,
      password: user!.password,
    },
  });

  res.status(201).json({
    status: true,
    msg: 'User created successfully',
  });
});

router.post('/signin', async (req: Request, res: Response) => {
  try {
    const body = userSignin.safeParse(req.body);
  } catch (error) {
    return res.json({ status: false, error: error });
  }

  const user = req.body;
  const secret = process.env.SECRET_KEY || 'default_secret';

  const userExist = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
    select: {
      id: true,
      email: true,
    },
  });

  if (!userExist) {
    return res.status(400).json({
      msg: 'User does not exist',
    });
  }

  const token = jwt.sign(
    { id: userExist?.id, email: userExist?.email },
    secret,
    {
      expiresIn: '7d',
    }
  );

  res.status(200).json({
    status: true,
    msg: 'Signin successful',
    token,
  });
});

export default router;
