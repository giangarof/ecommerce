import User from "../Model/User.js";
import Product from "../Model/Product.js";
import Order from '../Model/Order.js';

const addOrderItems = async(req,res) => {
    const user = await User.findById(req.user.userId);
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
        // console.log(order)
        const createOrder = await order.save()
        console.log(createOrder)
        res.status(201).json(createOrder)
    }

}

const getMyOrders = async(req,res) => {
    const orders = await Order.find({user: req.user.userId})
    console.log(req.user)
    res.status(200).json(orders)
}

const getOrderById = async(req,res)=> {
    // const orders = await Order.find({ user: req.user.userId });
    // res.json(orders);
    const orders = await Order.findById(req.params.id).populate('user','name email')
    try {
        if(orders){
            res.status(200).json(orders)
        } else{
            res.status(404).json({message:"No order found"})
        }
    } catch (error) {
        console.log(error)
    }
}

const updateOrderToPaid = async(req,res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };
        const updatedOrder = await order.save();
        res.status(200).json({message:'Order successfully paid.', order_paid: updatedOrder})
    } else {
        res.status(404).json({message:'Order not found'})
    }
}

const updateOrderToDelivered = async(req,res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.deliver = true;
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.status(200).json({message:'Order successfully to be delivered.', update_delivered:updatedOrder})
    } else {
        res.status(404).json({message:`Order not found.`})
    }
}

const getAllOrders = async(req,res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders)
}

export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders
}