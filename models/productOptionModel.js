import mongoose from 'mongoose'

const productOptionSchema = mongoose.Schema({
    Id: {
        type: String,
        required: true,
        unique: true
    },
    ProductId: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const ProductOption = mongoose.model('ProductOption', productOptionSchema)

export default ProductOption
