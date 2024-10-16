
const notFound = (req,res,next) => {
    const error = new Error(`not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err,req,res,next) => {
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

const asyncHandler = fn => (req,res,next) => {
    Promise.resolve(fn(req,res,next)).catch(next)
}

export {
    notFound,
    errorHandler,
    asyncHandler,
}