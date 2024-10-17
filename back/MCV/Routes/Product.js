import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from "../Controller/Product.js";
import { asyncHandler, protect } from "../../Config/middleware.js";
import { multerProduct } from "../../Config/multer.js";


const router = express()

router.get('/', asyncHandler(getProducts))
router.get('/:id', asyncHandler(getProductById))
router.post('/', protect, multerProduct, asyncHandler(createProduct))
router.put('/:id', multerProduct, asyncHandler(updateProduct))
router.delete('/:id', asyncHandler(deleteProduct))
router.get('/top', asyncHandler(getTopProducts))

export default router