import express from 'express'

import {
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
} from '../controllers/productController.js'

const router = express.Router()

router.route('').get(getProducts).post(createProduct)
router.route('/:id').get(getProductById).put(updateProductById).delete(deleteProductById)

router.route('/:id/options').get(getProductOptions).post(createProductOption)
router.route('/:id/options/:optionId').get(getProductOptionById).put(updateProductOptionById).delete(deleteProductOptionById)

export default router
