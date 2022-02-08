exports.catchAsyncErrors = callback => {
    return (req, res, next) => {
        callback(req, res, next).catch(err => {
            console.log('err at catchasync', err);
            next(err);
        })
    }
}