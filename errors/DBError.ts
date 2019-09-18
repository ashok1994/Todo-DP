import { BaseError, ErrorLevel } from "./BaseError";

export class DBError extends BaseError {
    
    constructor(code: string, message: string) {
        super(code, message, ErrorLevel.CRITICAL);
        this.name = "DBError";
        
        // Must be added to for correct stack address 
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DBError);
        }
    }


    static createError(code:string, e: Error) : DBError{
        const error = new DBError(code, e.message);
        return error;
    }
    
}




