export class CRUDError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CRUDError';
    }
};
