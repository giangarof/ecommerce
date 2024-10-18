import express from "express";
import { asyncHandler, protect } from "../../Config/middleware.js";
import { addOrderItems, getAllOrders, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToPay } from "../Controller/Order.js";
const router = express()

router.post('/', asyncHandler(addOrderItems))

router.get('/', asyncHandler(getMyOrders))

router.get('/:id', asyncHandler(getOrderById))

router.put('/:id/pay', asyncHandler(updateOrderToPay))

router.put('/:id/deliver', asyncHandler(updateOrderToDelivered))

router.get('/allorders', asyncHandler(getAllOrders))

export default router;