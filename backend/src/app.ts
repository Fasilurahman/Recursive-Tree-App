import express, {Application} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodeRoutes from './presentation/routes/node-routes';
import { connectDB } from './infrastructure/config/db';


dotenv.config()
connectDB();

const app: Application = express()

app.use(cors())
app.use(express.json())                                     



app.use('/api/nodes', nodeRoutes);

export default app;