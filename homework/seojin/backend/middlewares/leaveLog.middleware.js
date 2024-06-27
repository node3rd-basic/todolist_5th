export default (req, res, next) => {
    console.log(`
        ${req.method} ${req.url} [${ new Date().toISOString()}] ${ req.headers.referer}`)
   next()
}