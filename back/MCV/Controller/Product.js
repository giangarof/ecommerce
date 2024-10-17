import Product from "../Model/Product.js";
import User from "../Model/User.js"

// fetch all products
// description: list all products
const getProducts = async(req,res) => {
    const product = await Product.find({})
    res.status(200).json(product)
}

// get by id
// get the product by id
const getProductById = (req,res) => {
    res.status(200).json({message:'By Id'})
}

// create
// user can create a new product
const createProduct = async(req,res) => {
    const user = await User.findById(req.user.userId);
    const product = new Product(req.body)
    // console.log(user)
    product.image = req.files.map(f => ({
        url: f.path, 
        filename: f.filename, 
        originalname:f.originalname
    }));
    product.user = user
    const created = await product.save()
    console.log(req.user)
    res.status(200).json({message:'created', product:product})
}

//update
// user can update a new product
const updateProduct = async(req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id)

    if(!product){
        res.status(404).json({message:`Product doesn't exist.`})
    }
    // Handle post image updates
    if (req.files) {
        const imgs = req.files.map(f => ({
            url: f.path,
            filename: f.filename,
            originalname: f.originalname
        }));
        if (imgs.length > 0) {
            product.image = imgs;
        }
    }
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename)
        }
        await post.updateOne({$pull: {image: {filename: { $in: req.body.deleteImages}}}})
    }
    if(product){
            product.name= req.body.name;
            product.author= req.body.author;
            product.category= req.body.category
            product.description= req.body.description
            product.price= req.body.price
            product.countInStock= req.body.countInStock
            await product.save()
        res.status(200).json({message:`Successfully updated!`, product:product})
    }
}

// delete
// user can delete a product
const deleteProduct = async(req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id)
    if(!product){

        res.status(404).json({message:`Product doesn't exist.`})
    }
    if(product){
        await product.deleteOne()
        res.status(404).json({message:`Produt deleted successfully`})
    }
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