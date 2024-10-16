import Product from "../Model/Product.js";

// fetch all products
// description: list all products
const getProducts = (req,res) => {
    res.status(200).json({message:'all products'})
}

// get by id
// get the product by id
const getProductById = (req,res) => {
    res.status(200).json({message:'By Id'})
}

// create
// user can create a new product
const createProduct = (req,res) => {
    res.status(200).json({message:'created'})
}

//update
// user can update a new product
const updateProduct = (req,res) => {
    res.status(200).json({message:'updated'})
}

// delete
// user can delete a product
const deleteProduct = (req,res) => {
    res.status(200).json({message:'deleted'})
}

// top products
// top 3 based in rating
const getTopProducts = (req,res) => {
    res.status(200).json({message:'Top 3'})
}

export{
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getTopProducts
}