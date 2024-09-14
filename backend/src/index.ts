import express, { Express, Request, Response } from 'express';

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
