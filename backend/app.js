import express from 'express'
import reportRoutes from './routes/reportRoutes.js'
import cors from "cors";

const app = express()

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to RECALL Backend API')
})

app.use('/api/reports', reportRoutes)

export default app