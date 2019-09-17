// Defining Errors

/*

Error {
    type         - Will be handled by class type
    message      - Already present in the base error class
    code         - String Error Code
    trace        - Already present in Base Error Class
    date         - Timestamp when error occured 
    level        - Level of the error 
}
*/


export enum ErrorLevel {
    LOW = "LOW",
    CRITICAL = "CRITICAL"
}


export class BaseError extends Error {
    code: string;
    timestamp: number;
    level: ErrorLevel;
    constructor(code: string, message: string, level: ErrorLevel = ErrorLevel.LOW) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseError);
        }
        this.name = 'BaseError';
        // Other Info
        this.code = code;
        this.timestamp = Date.now();
        this.level = level;
    }
}
