
// Dependencies
import dotenv from 'dotenv'
import path from "path"
import express from "express";
import connectDB from "./Config/db.js";
import cookieParser from "cookie-parser"

// setting the configuration
dotenv.config()
connectDB()

// middleware
import { notFound, errorHandler } from "./Config/middleware.js";

// routes
import Products from './MCV/Routes/Product.js'
import User from "./MCV/Routes/User.js";
import Order from "./MCV/Routes/Order.js";

const app = express()

// app.use()
// parsing json
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//routes
app.use('/api/products', Products)
app.use('/api/user', User)
app.use('/api/order', Order)
app.get('/api/config/paypal', (req,res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

// error handler middleware
app.use(notFound)
app.use(errorHandler)

// Running port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`running on port ${port}`))