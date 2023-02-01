import cors from 'cors';
import express from 'express';
import serverless from 'serverless-http';

import { initDb } from './db/initDb';
import userRouter from './routers/userRouter';
import transactionRouter from './routers/transactionRouter';
import authRouter from './routers/authRouter';

const app = express();
const port = 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

initDb();

app.use('/api/users', userRouter);

app.use('/api/auth', authRouter);

app.use('/api/transactions', transactionRouter);

app.listen(port, () => console.log(`Running on port ${port}`));

module.exports.handler = serverless(app);