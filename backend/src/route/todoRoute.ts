import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import prisma from '../db/db';
import authMiddleware from '../middleware';
import { createTodo } from '../validation';

dotenv.config();

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

const router: Express = express();
router.use(express.json());

//create Todo

router.post(
  '/create',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    const body = createTodo.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({ status: false, errors: body.error.errors });
    }

    const data = body.data;

    try {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated.' });
      }
      const response = await prisma.todo.create({
        data: {
          title: data.title,
          description: data.description || '',
          completed: false,
          userId: req.user.id,
        },
      });

      return res.status(200).json({
        status: true,
        msg: 'Added successfully',
        todo: response,
      });
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
  }
);

//read all Todo

router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.send('User not logged in');
  }
  const user = req?.user;

  const todo = await prisma.todo.findMany({
    where: {
      userId: user.id,
    },
  });

  res.status(200).json({
    status: true,
    msg: 'fetched data successfully',
    data: todo,
  });
});

//update Todo

router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  const body = createTodo.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ status: false, errors: body.error.errors });
  }

  const data = body.data;

  try {
    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    });

    res.status(200).json({
      status: true,
      msg: 'Updated successfully',
      data: todo,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      msg: 'failed to update',
    });
  }
});

//delete Todo

router.delete(
  '/:id',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    const id = Number(req.params.id);

    try {
      await prisma.todo.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        status: true,
        msg: 'Record deleted successfuly',
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        msg: 'record does not exist',
      });
    }
  }
);

export default router;
