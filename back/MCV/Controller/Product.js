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
const createReview = async(req,res) => {
    const {rating,comment} = req.body;
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404).json({message:'product doesn`t exist'})
    } else {
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error(`You can review only once.`)
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
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
const deleteReview = async (req, res) => {
    try {
      const { id, idreview } = req.params;
  
      // Assuming you have the user ID from the request (e.g., from a token)
      const userId = req.user._id; // Adjust this according to how you retrieve the authenticated user's ID
    
      // Find the product by ID
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Find the review index in the reviews array
      const reviewIndex = product.reviews.findIndex((review) => review._id.toString() === idreview);
      
      if (reviewIndex === -1) {
        return res.status(400).json({ message: 'This review ID does not exist' });
      }
  
      // Check if the user is the one who wrote the review
      const review = product.reviews[reviewIndex];
      if (review.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this review' });
      } else {

          // Remove the review from the reviews array
          product.reviews.splice(reviewIndex, 1);
      
          // Update numReviews and rating
          product.numReviews = product.reviews.length;
          product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / (product.numReviews > 0 ? product.numReviews : 1); // Avoid division by zero
      
          // Save the updated product
          await product.save();
      
          res.status(200).json({ message: 'Review deleted successfully' });
      }
  
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

export{
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getTopProducts,
    createReview,
    deleteReview
    
}