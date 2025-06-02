const routeNotFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (error, req, res, next) => {
    let     statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let     message = error.message;
    //the error coming from the database mongo
    if(error.name=== "CastError" && error.kind ==='ObjectId'){
        statusCode = 400;
        message = "ressource not found";
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
};

module.exports = { routeNotFound, errorHandler };
