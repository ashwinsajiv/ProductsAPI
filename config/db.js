import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        var conn
        if (process.env.MODE == 'prod') {
            conn = await mongoose.connect(process.env.MONGO_URI_PROD, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            })
        } else if (process.env.MODE == 'local') {
            conn = await mongoose.connect(process.env.MONGO_URI_LOCAL, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            })
        } else if (process.env.MODE == 'docker') {
            conn = await mongoose.connect(process.env.MONGO_URI_DOCKER, {
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