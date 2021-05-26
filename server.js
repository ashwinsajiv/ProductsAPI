import colors from 'colors'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()
connectDB()
const app = express()
app.get('/', (req, res) => {
    res.send('API online')
})
app.use(express.json());
app.use(express.urlencoded());
app.use('/products', productRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || "dev"
app.listen(PORT, console.log(`Server running on: localhost:${PORT} in ${NODE_ENV} mode`.yellow.bold))