import colors from 'colors'
import express from 'express'
import dotenv from 'dotenv'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import connectDB from './config/db.js'
import { badRequest, notFound, errorHandler } from './middleware/errorMiddleware.js'
import logger from './logger/logger.js'
import options from './utils/openAPIHelper.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()
connectDB()
const app = express()
const swaggerDocs = await swaggerJsDoc(options)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.get('/', (req, res) => {
    res.send('API online')
})
app.use(express.json());
app.use(express.urlencoded());
app.use('/products', productRoutes)
app.use(badRequest)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
const MODE = process.env.MODE || "local"
app.listen(PORT, logger.info(`Server running on: localhost:${PORT} in ${MODE} mode`.yellow.bold))

export default app
