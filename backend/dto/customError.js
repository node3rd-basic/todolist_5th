import statusCode from "../constants/statusCode.js";

export class BadRequestException extends Error {
    status

    constructor(message) {
        console.log("👍", statusCode.BAD_REQUEST)
        super(message || "BadRequestException");
        this.status = statusCode.BAD_REQUEST
    }
}

export class DuplicatedRecordException extends Error {
    status

    constructor(message) {
        super(message || "DuplicatedRecordException");
        this.status = statusCode.DUPLICATED_RECORD
    }
}

export class NotFoundException extends Error {
    status

    constructor(message) {
        super(message || "NotFoundException");
        this.status = statusCode.NOT_FOUND
    }
}

export class SystemErrorException extends Error {
    status

    constructor(message) {
        super(message || "SystemErrorException");
        this.status = statusCode.SERVER_ERROR
    }
}

export class DatabaseException extends Error {
    status

    constructor(message) {
        super(message || "databaseErrorException");
        this.status = statusCode.SERVER_ERROR
    }
}