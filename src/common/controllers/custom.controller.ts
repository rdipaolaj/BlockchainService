import { Controller, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '../responses/api-response';
import { CustomException } from '../exceptions/custom-exception';
import { ApiErrorCode } from '../Enums/api-error-code.enum';

@Controller()
export class CustomController {
    protected OkOrBadRequest<T>(apiResponse: ApiResponse<T>) {
        if (apiResponse.success) {
            // Devuelve un 200 si la respuesta es exitosa
            return {
                statusCode: HttpStatus.OK,
                response: apiResponse
            };
        } else {
            // Lanza una excepción con el código de error adecuado
            throw new CustomException(ApiErrorCode.ValidationError, 'Invalid input data provided.', 400);
        }
    }
}