// Seeder to be used only when creating the database entries from scratch.
// Use the seeder script once at the start or updated entries will be lost.
import colors from 'colors'
import dotenv from 'dotenv'
import products from './data/products.js'
import productOptions from './data/productOptions.js'
import Product from './models/productModel.js'
import ProductOption from './models/productOptionModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async() => {
    try {
        await Product.deleteMany()
        await ProductOption.deleteMany()
        await Product.insertMany(products)
        await ProductOption.insertMany(productOptions)

        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        await Product.deleteMany()
        await ProductOption.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}