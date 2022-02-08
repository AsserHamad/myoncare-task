exports.catchAsyncErrors = callback => {
    return (req, res, next) => {
        callback(req, res, next).catch(err => {
            next(err);
        })
    }
}