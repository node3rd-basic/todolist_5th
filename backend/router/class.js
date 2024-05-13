import {Router} from "express"
import ResponseDTO from "../dto/responseDto.js";
import {BadRequestException, DatabaseException, DuplicatedRecordException} from "../dto/customError.js";
import statusCode from "../constants/statusCode.js";

const router = Router()

function response(res, response) {
    res.status(response.status).json(response.json())
}

router.get("/", (req, res) => {

    const data = {
        id: 1,
        name: "우준호"
    }
    response(res, new ResponseDTO(data, statusCode.CREATED))
})

router.get("/items", (req, res, next) => {

    try{
        // console.log("validation-check")
        // throw new BadRequestException()
        // console.log("id 중복")
        // throw new DuplicatedRecordException()
        // console.log("database error")
        throw new DatabaseException("Your query is wrong. check syntax!")
        const data = {
            id: 1,
            name: "우준호"
        }
        response(res, new ResponseDTO(data))
    } catch (error) {
        next(error)
    }
})

export default router