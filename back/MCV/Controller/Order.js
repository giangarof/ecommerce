import User from "../Model/User.js";
import Product from "../Model/Product.js";
import Order from '../Model/Order.js';

const addOrderItems = async(req,res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400).json({message:'No order items'})
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x, 
                product: x._id,
                _id: undefined
            })),
            user: req.user.userId,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }
}

const getMyOrders = async(req,res) => {
    const orders = await Order.find({user: req.user.userId})
    res.status(200).json(orders)
}

const getOrderById = async(req,res)=> {
    const orders = await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.status(200).json(orders)
    } else{
        res.status(404).json({message:"No order found"})
    }
}

const updateOrderToPay = (req,res) => {

}

const updateOrderToDelivered = (req,res) => {

}

const getAllOrders = (req,res) => {

}

export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPay,
    updateOrderToDelivered,
    getAllOrders
}