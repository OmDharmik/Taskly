import express, { Express, Request, Response } from 'express';
import todoRouter from './route/todoRoute';
import userRouter from './route/userRoute';

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
