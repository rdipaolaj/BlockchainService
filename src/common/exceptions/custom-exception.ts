import { HttpException } from '@nestjs/common';
import { ApiErrorCode } from '../enums/api-error-code.enum';

export class CustomException extends HttpException {
    constructor(
        public readonly errorCode: ApiErrorCode,  // Usamos ApiErrorCode para códigos de error
        public readonly message: string,
        public readonly statusCode: number = 400  // Valor por defecto para el código de estado HTTP
    ) {
        super({ errorCode: errorCode.toString(), message }, statusCode);
    }
}