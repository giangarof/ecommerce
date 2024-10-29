import express from "express";
import { admin, asyncHandler, protect } from "../../Config/middleware.js";
import { addOrderItems, getAllOrders, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToPaid } from "../Controller/Order.js";
const router = express()

router.get('/getallorders', getAllOrders)

router.post('/', protect, asyncHandler(addOrderItems))

router.get('/mine', protect, asyncHandler(getMyOrders))

router.get('/:id', protect, asyncHandler(getOrderById))

router.put('/:id/pay', asyncHandler(updateOrderToPaid))

router.put('/:id/deliver', asyncHandler(updateOrderToDelivered))


export default router;