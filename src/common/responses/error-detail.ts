// src/common/responses/error-detail.ts
export class ErrorDetail {
    code: string;
    description: string;

    constructor(code: string, description: string) {
        this.code = code;
        this.description = description;
    }
}