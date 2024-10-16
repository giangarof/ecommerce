
// Dependencies
import express from "express";
import connectDB from "./Config/db.js";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"

// middleware
import { notFound, errorHandler } from "./Config/middleware.js";

// routes
import Products from './MCV/Routes/Product.js'
import User from "./MCV/Routes/User.js";

// setting the configuration
dotenv.config()
const app = express()
connectDB()



// app.use()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/products', Products)
app.use('/api/user', User)

app.use(notFound)
app.use(errorHandler)

// Running port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`running on port ${port}`))