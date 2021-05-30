import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    Id: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true,
        default: 0
    },
    DeliveryPrice: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product
