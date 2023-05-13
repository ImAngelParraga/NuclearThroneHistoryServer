export class FirestoreError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class DocNotFound extends FirestoreError {
    constructor(id: string) {
        super(`Document with id ${id} was not found`)
    }
}  