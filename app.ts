import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('App is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
