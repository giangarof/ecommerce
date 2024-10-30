import Product from "../Model/Product.js";
import User from "../Model/User.js"

// fetch all products
// description: list all products
const getProducts = async(req,res) => {
    try {
        const product = await Product.find({})
        if(!product){
            res.status(404).json({message:'No products'})
        }
        if(product){
            res.status(200).json(product)
        }
    } catch (error) {
        res.status(404)
        throw new Error(error)
        // res.status(404).json({message:'something went wrong', error:error})
    }
}

// get by id
// get the product by id
const getProductById = async(req,res) => {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
}

// create
// user can create a new product
const createProduct = async(req,res) => {
    const user = await User.findById(req.user._id);
    const product = new Product(req.body)

    // console.log(`req.user:::`, typeof(req.user.userId))
    console.log(`user data: ${user}`)

    product.image = req.files.map(f => ({
        url: f.path, 
        filename: f.filename, 
        originalname:f.originalname
    }));
    product.user = user
    const created = await product.save()

    res.status(201).json(product)
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
            // console.log(product)
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


//Reviews

//create
const createReview = async() => {
    const {rating,comment} = req.body;
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404).json({message:'product doesn`t exist'})
    } else {
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user.i_id.toString())
        if(alreadyReviewed){
            res.status(400).json({message:`You can review only once.`})
        }
        const review = {
            name: req.user.name,
            rating: Number(String),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc,rev) => acc + rev.rating, 0) / product.reviews.length
        await product.save()
        res.status(201).json({message:`Review added`})
    }
}

//delete
// const deleteReview = () => {
    
// }

export{
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getTopProducts,
    createReview,
    
}