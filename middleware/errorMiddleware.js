const badRequest = (req, res, next) => {
    const error = new Error(`Bad request - ${req.originalUrl}`)
    res.status(400)
    next(error)
}

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.MODE === 'production' ? null : err.stack,
    })
}

export { badRequest, notFound, errorHandler }
