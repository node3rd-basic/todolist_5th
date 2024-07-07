import CustomError from "../common/custom.error.js";
export default function errorMiddleware(err, req, res, next) {
    if (err instanceof CustomError) {
        res.status(err.status).send({message: err.message})
    } else {
        console.error(err)
        res.status(500).send({message: "Internal Server Error"})
    }
}