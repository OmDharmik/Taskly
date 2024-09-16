import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'You are not authorized. Sign In' });
  }

  try {
    const secret = process.env.SECRET_KEY as string;
    const decoded = jwt.verify(token, secret) as { id: number; email: string };

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default authMiddleware;
