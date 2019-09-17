import { BaseError, ErrorLevel } from "./BaseError";

export class DBError extends BaseError {
    
    static createError(code:string, e: Error) : DBError{
        const error = new DBError(code, e.message);
        return error;
    }
    
    constructor(code: string, message: string) {
        super(code, message, ErrorLevel.CRITICAL);
        this.name = "DBError";
    }
}




