import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import gamesRoute from './routes/gamesRoute.js';
import customersRoute from './routes/customersRoute.js'

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(gamesRoute)
app.use(customersRoute)

app.listen(process.env.PORT, () => console.log("Server is up on port:" + process.env.PORT));
