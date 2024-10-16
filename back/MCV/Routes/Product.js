import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from "../Controller/Product.js";
import { asyncHandler } from "../../Config/middleware.js";
import { multerPost } from "../../Config/multer.js";


const router = express()

router.get('/', asyncHandler(getProducts))
router.put('/product/:id', asyncHandler(getProductById))
router.post('/create', asyncHandler(createProduct))
router.put('/update/:id', asyncHandler(updateProduct))
router.delete('/', asyncHandler(deleteProduct))
router.get('/top', asyncHandler(getTopProducts))

export default router