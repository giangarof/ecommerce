import User from '../Model/User.js';
import { generateToken } from '../../Config/token.js';

// Login
// description: user will login with credentials
const loginUser = async(req,res) => {

    try {
        // request the data
        const {email, password} = req.body;
        //find the user
        const user = await User.findOne({ email });
        if(user && (await user.matchPassword(password))){
            generateToken(res, user._id)
            res.status(200).send(user)
        } else{
            res.status(404).send(`Invalid credentials.`)
        }
        // res.status(200).json({message:'user found', user:user})
        
    } catch (error) {
        res.status(400).send({message:`error in login controller: ${error}`})
    }
}

// Signup
// descripttion: new user
const signupUser = async(req,res) => {

    try {
        // request the body data
        const {name, email, password} = req.body;
    
        // verify if email already exists
        const email_checker = await User.findOne({email})
    
        // if email exists thrown error. Otherwise create new account
        if(email_checker){
            res.status(400).json({message:'Email already in use. Please, use another email.'})
        } else {
            const newUser = await User.create({name,email,password})
            res.status(201).json(newUser)
            // console.log(req.body)
        }
        
    } catch (error) {
        res.status(400).send({message:`Please fill up all fields.`})
    }


    // res.status(200).json({message:'signup'})

}

// Logout
// description: logout user and clear cookie
const logOutUser = (req,res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
}

// Get all users
// descriptio: list of all users
const getAllUsers = async(req,res) => {
    const users = await User.find({})
    res.status(200).json({users})
}


// Get User profile
// description: get profile of the loged user
const getUserProfile = async(req,res) => {
    const {id} = req.params;
    const user = await User.findById(id)

    //If user doesn't exist
    if(!user){
        res.status(404).send(`user dont exist.`)
    }

    //If user exists
    if(user){
        res.status(200).json({user})
    } else{
        res.status(404).json({message:'User not found'})
    }
}

// Update User Profile
// description: update profile of the loged user
const UpdateUserProfile = async(req,res) => {
    const {id} = req.params;
    const user = await User.findById(id)
    const {
        name, password, confirmPassword, email
    } = req.body;

    //If user doesn't exist
    if(!user){
        res.status(404).send(`user dont exist.`)
    }

    //verify if the new email exist
    const verifyIfEmailExits = await User.findOne({email})
    if (verifyIfEmailExits && verifyIfEmailExits._id.toString() !== id){
        res.status(400).send(`'Email already in use. Please, use another email.'`)
    } else if(user){ //If user exists
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save()
        res.status(200).json(user)
    } else{
        res.status(404).json({message:'User not found'})
    }
}


// Get user profile by ID
// description: get any user by id
const getUserProfileById = async(req,res) => {
    const {id} = req.params;
    const user = await User.findById(id)
    if(!user){
        res.status(404).json({message:`User doesn't exist`})
    }
    if(user){

        res.status(200).json(user)
    }
}

// Update user profile by id
// description: update any user by id
const UpdateUserProfileById = async(req,res) => {
    const {id} = req.params;
    const user = await User.findById(id)
    if(!user){
        res.status(404).json({message:`User doesn't exist`})
    }
    if(user){
        user.name = req.body.name         
        user.email = req.body.email 
        user.isAdmin = req.body.isAdmin
    }
    res.status(200).json({message:'User updated successfully!', data:user})
}

// Delete User
// description: delete user
const deleteUser = async(req,res) => {
    const {id} = req.params;
    const user = await User.findById(id)
    if(!user){
        res.status(404).json({message:`User doesn't exist`})
    }
    if(user) {
        await user.deleteOne()
        res.status(200).json({message:'delete'})
    }
}

export{
    loginUser,
    signupUser,
    logOutUser,
    getAllUsers,
    getUserProfile,
    UpdateUserProfile,
    UpdateUserProfileById,
    getUserProfileById,
    deleteUser,
}