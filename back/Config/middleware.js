import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
import User from '../MCV/Model/User.js';

export const notFound = (req,res,next) => {
    const error = new Error(`not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorHandler = (err,req,res,next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        message = 'Resource not found';
        statusCode = 404
    }

    res.status(statusCode).json({
        message
    })
}

export const asyncHandler = fn => (req,res,next) => {
    Promise.resolve(fn(req,res,next)).catch(next)
}

export const protect = asyncHandler(async(req,res,next) => {
    let token;
    // Read the jwt from the cookie
    token = req.cookies.jwt;
    
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401);
            throw new Error('No authorization, token failed')
        }

    } else {
        res.status(401);
        throw new Error('No authorization allowed')
    }
})

export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
      res.status(401);
      throw new Error('Not authorized as an admin');
    }
  };

// export {
//     notFound,
//     errorHandler,
//     asyncHandler,
//     protect,
//     admin
// }