import express, { Express, Request, Response } from 'express';
import { dbConnection } from './src/configs/db.config';
import dotenv from 'dotenv';

dotenv.config();

dbConnection();

const PORT: string | undefined = process.env.PORT;
const HOST: string | undefined = process.env.HOST;

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('App is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST!}:${PORT!}`);
});
