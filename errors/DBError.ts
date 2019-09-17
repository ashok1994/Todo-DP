import { BaseError, ErrorLevel } from "./BaseError";

export class DBError extends BaseError {
    constructor(code: string, message: string) {
        super(code, message, ErrorLevel.CRITICAL);
        this.name = "DBError";
    }
}




