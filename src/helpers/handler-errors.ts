export class HandlerError {
    private errors = [] // private errorInstance
    constructor(errors) {
        this.toParserErrors(errors)
    }

    toString(): string {
        return this.errors.join(', ')
    }

    getErrors() {
        return this.errors
    }
    private toParserErrors(errors : Array < any >) {
        if (!errors) 
            return this.errors.push(errors);
        
        errors.map(e => {
            this.errors.push(`${
                e.message
            }`)
        })
    }
}
