import express from 'express'
import reportRoutes from './routes/reportRoutes.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to RECALL Backend API')
})

app.use('/reports', reportRoutes)

export default app