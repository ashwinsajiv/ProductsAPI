import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import ProductOption from '../models/productOptionModel.js'
import { v4 as uuidv4 } from 'uuid';

// @desc    Fetch all products by name if specified or fetch all products.
// @route   GET /products
// @route   GET /products?name={name}
const getProducts = asyncHandler(async(req, res) => {
    if (req.query.name) {
        const regex = new RegExp(req.query.name, 'i')
        const products = await Product.find({ Name: { $regex: regex } })
        res.json(products)
    } else {
        const products = await Product.find({})
        res.json(products)
    }
})

// @desc    Fetch a specific product by Id.
// @route   GET /products/:id
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findOne({ Id: req.params.id })
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create a product.
// @route   POST /products
const createProduct = asyncHandler(async(req, res) => {
    const {
        Name,
        Description,
        Price,
        DeliveryPrice
    } = req.body
    const product = new Product({
        Id: uuidv4(),
        Name: Name,
        Description: Description,
        Price: Price,
        DeliveryPrice: DeliveryPrice
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc    Update a product by Id.
// @route   PUT /products/:id
const updateProductById = asyncHandler(async(req, res) => {
    const {
        Name,
        Description,
        Price,
        DeliveryPrice
    } = req.body
    const product = await Product.findOne({ Id: req.params.id })
    if (product) {
        product.Name = Name
        product.Description = Description
        product.Price = Price
        product.DeliveryPrice = DeliveryPrice
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Delete a product.
// @route   DELETE /products/:id
const deleteProductById = asyncHandler(async(req, res) => {
    const product = await Product.findOne({ Id: req.params.id })
    const productOptions = await ProductOption.find({ ProductId: req.params.id })
    productOptions.forEach(async function(productOption) {
        if (productOption) {
            await productOption.remove()
        }
    })
    if (product) {
        await product.remove()
        res.json({ message: 'Product and options removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Fetch all product options.
// @route   GET /products/:id/options
const getProductOptions = asyncHandler(async(req, res) => {
    const productOptions = await ProductOption.find({ ProductId: req.params.id })
    res.json(productOptions)
})

// @desc    Fetch a product option by Id.
// @route   GET /products/:id/options/:optionId
const getProductOptionById = asyncHandler(async(req, res) => {
    const productOptions = await ProductOption.find({ Id: req.params.optionId, ProductId: req.params.id })
    if (productOptions) {
        res.json(productOptions)
    } else {
        res.status(404)
        throw new Error('Product option not found')
    }
})

// @desc    Create a product option.
// @route   POST /products/:id/options
const createProductOption = asyncHandler(async(req, res) => {
    const {
        Name,
        Description
    } = req.body
    const productOption = new ProductOption({
        Id: uuidv4(),
        ProductId: req.params.id,
        Name: Name,
        Description: Description,
    })
    const createdProductOption = await productOption.save()
    res.status(201).json(createdProductOption)
})

// @desc    Update a product option by Id.
// @route   PUT /products/:id/options/:optionId
const updateProductOptionById = asyncHandler(async(req, res) => {
    const {
        Name,
        Description
    } = req.body
    const productOption = await ProductOption.findOne({ Id: req.params.optionId, ProductId: req.params.id })
    if (productOption) {
        productOption.Name = Name
        productOption.Description = Description
        const updatedProductOption = await productOption.save()
        res.json(updatedProductOption)
    } else {
        res.status(404)
        throw new Error('Product option not found')
    }
})

// @desc    Delete a product option by Id.
// @route   DELETE /products/:id/options/:optionId
const deleteProductOptionById = asyncHandler(async(req, res) => {
    const productOption = await ProductOption.findOne({ Id: req.params.optionId, ProductId: req.params.id })
    if (productOption) {
        await productOption.remove()
        res.json({ message: 'Product option removed' })
    } else {
        res.status(404)
        throw new Error('Product option not found')
    }
})

export {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
    getProductOptions,
    getProductOptionById,
    createProductOption,
    updateProductOptionById,
    deleteProductOptionById
}