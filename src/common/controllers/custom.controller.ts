import { Controller, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '../responses/api-response';
import { CustomException } from '../exceptions/custom-exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Controller()
export class CustomController {

    /**
     * Método para devolver un 200 o lanzar una excepción en base a la evaluación del resultado de un api response
     * @param apiResponse Objeto ApiResponse
     * @returns Un objeto con el status 200 o lanza una excepción con el código adecuado
     */
    protected OkOrBadRequest<T>(apiResponse: ApiResponse<T>) {
        if (apiResponse.success) {
            // Devuelve un 200 si la respuesta es exitosa
            return apiResponse;
        } else {
            // Lanza una excepción con el código de error adecuado
            throw new CustomException(ApiErrorCode.ValidationError, 'Invalid input data provided.', 400);
        }
    }
}