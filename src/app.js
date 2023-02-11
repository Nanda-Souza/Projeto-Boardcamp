import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import gamesRoute from './routes/gamesRoute.js';
import customersRoute from './routes/customersRoute.js'
import rentalsRoute from './routes/rentalsRoute.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(gamesRoute, customersRoute, rentalsRoute)

app.listen(process.env.PORT, () => console.log("Server is up on port:" + process.env.PORT));
