const logger = (req,res,next) => {
    console.log(`[${Date()}] :::: ${req.method} ${req.url}`);
    next();
}

export default logger;