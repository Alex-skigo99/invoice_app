export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
};

export class ResourceNotExistError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ResourceNotExistError';
    }
};
