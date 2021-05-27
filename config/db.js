import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        var conn
        if (process.env.NODE_ENV == 'prod') {
            conn = await mongoose.connect(process.env.MONGO_URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            })
        } else {
            conn = await mongoose.connect(process.env.MONGO_URI_LOCAL, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            })
        }
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB