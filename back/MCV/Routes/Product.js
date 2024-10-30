import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from "../Controller/Product.js";
import { asyncHandler, protect, admin } from "../../Config/middleware.js";
import { multerProduct } from "../../Config/multer.js";


const router = express()

router.get('/', asyncHandler(getProducts))
router.get('/:id', asyncHandler(getProductById))

router.post('/',  protect, admin, multerProduct, asyncHandler(createProduct))

router.put('/:id', protect, admin, multerProduct, asyncHandler(updateProduct))
router.delete('/:id', protect, admin, asyncHandler(deleteProduct))
router.get('/top', asyncHandler(getTopProducts))

export default router