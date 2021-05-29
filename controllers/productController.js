import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import ProductOption from '../models/productOptionModel.js'
import { v4 as uuidv4 } from 'uuid';

/**
 * @openapi
 * /products:
 *  get:
 *      summary: Fetch all products.
 *      responses:
 *          '200':
 *              description: All products fetched.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */
/**
 * @openapi
 * /products?name={name}:
 *  get:
 *      summary: Fetch all products matching the specified name.
 *      parameters:
 *        - in: param
 *          name: name
 *          type: string
 *          required: true
 *      responses:
 *          '200':
 *              description: All matching products fetched.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */
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

/**
 * @openapi
 * /products/{id}:
 *  get:
 *      summary: Fetch a specific product by Id.
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *      responses:
 *          '200':
 *              description: Product fetched.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          '404':
 *              description: Product not found.
 */
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findOne({ Id: req.params.id })
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

/**
 * @openapi
 * /products:
 *  post:
 *      summary: Create a product.
 *      requestBody:
 *          description: Product to be created. 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          '201':
 *              description: Product created.
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 */
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

/**
 * @openapi
 * /products/{id}:
 *  put:
 *      summary: Update a product by Id.
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *      requestBody:
 *          description: Product to be updated. 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          '200':
 *              description: Product updated.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          '404':
 *              description: Product not found.
 */
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

/**
 * @openapi
 * /products/{id}:
 *  delete:
 *      summary: Delete a product.
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *      responses:
 *          '200':
 *              description: Product deleted.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *          '404':
 *              description: Product not found.
 */
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

/**
 * @openapi
 * /products/{id}/options:
 *  get:
 *      summary: Fetch all product options for the specified product Id.
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *      responses:
 *          '200':
 *              description: All product options fetched.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/ProductOption'
 */
const getProductOptions = asyncHandler(async(req, res) => {
    const productOptions = await ProductOption.find({ ProductId: req.params.id })
    res.json(productOptions)
})

/**
 * @openapi
 * /products/{id}/options/{optionId}:
 *  get:
 *      summary: Fetch a product option by option Id for the specified product Id.
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *        - in: path
 *          name: optionId
 *          type: string
 *          required: true
 *      responses:
 *          '200':
 *              description: Product option fetched.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ProductOption'
 *          '404':
 *              description: Product not found.
 */
const getProductOptionById = asyncHandler(async(req, res) => {
    const productOptions = await ProductOption.find({ Id: req.params.optionId, ProductId: req.params.id })
    if (productOptions) {
        res.json(productOptions)
    } else {
        res.status(404)
        throw new Error('Product option not found')
    }
})

/**
 * @openapi
 * /products/{id}/options:
 *  post:
 *      summary: Create a product option.
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *      requestBody:
 *          description: Product option to be created. 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductOption'
 *      responses:
 *          '201':
 *              description: Product option created.
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/ProductOption'
 *          '404':
 *              description: Product not found.
 */
const createProductOption = asyncHandler(async(req, res) => {
    const {
        Name,
        Description
    } = req.body
    const product = await Product.find({ Id: req.params.id })
    if (product.length == 1) {
        const productOption = new ProductOption({
            Id: uuidv4(),
            ProductId: req.params.id,
            Name: Name,
            Description: Description,
        })
        const createdProductOption = await productOption.save()
        res.status(201).json(createdProductOption)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

/**
 * @openapi
 * /products/{id}/options/{optionId}:
 *  put:
 *      summary: Update a product option by Id.
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *        - in: path
 *          name: optionId
 *          type: string
 *          required: true
 *      requestBody:
 *          description: Product option to be updated. 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductOption'
 *      responses:
 *          '200':
 *              description: Product option updated.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ProductOption'
 *          '404':
 *              description: Product option not found.
 */
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

/**
 * @openapi
 * /products/{id}/options/{optionId}:
 *  delete:
 *      summary: Delete a product option.
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *        - in: path
 *          name: optionId
 *          type: string
 *          required: true
 *      responses:
 *          '200':
 *              description: Product option deleted.
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *          '404':
 *              description: Product option not found.
 */
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