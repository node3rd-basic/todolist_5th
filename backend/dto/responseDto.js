import statusCode from "../constants/statusCode.js"
export default class ResponseDTO {
    message
    success
    data
    status

    constructor(data, status, success, message) {
        this.data = data
        this.status = status || statusCode.OK
        this.message = message || "okay"
        this.success = success !== false
    }

    json() {
        return {
            data: this.data,
            message: this.message,
            success: this.success,
        }
    }
}