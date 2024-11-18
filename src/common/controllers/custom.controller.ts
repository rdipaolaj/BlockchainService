import { Controller, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '../responses/api-response';
import { CustomException } from '../exceptions/custom-exception';
import { ApiErrorCode } from '../enums/api-error-code.enum';

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
            const errorCode = this.getValidatedErrorCode(apiResponse.errors[0]?.code);
            console.log(`CustomController: ${errorCode} - ${apiResponse.errors[0]?.description}`);
            const errorMessage = apiResponse.errors[0]?.description || apiResponse.message || 'Datos de entrada no válidos.';
            const statusCode = apiResponse.statusCode || HttpStatus.BAD_REQUEST;

            throw new CustomException(errorCode, errorMessage, statusCode);
        }
    }

    /**
     * Verifica si el código de error es válido y lo convierte a ApiErrorCode, o devuelve un valor predeterminado.
     * @param code Código de error a validar
     * @returns Un ApiErrorCode válido
     */
    private getValidatedErrorCode(code: string | undefined): ApiErrorCode {
        // Convertimos 'code' a 'unknown' antes de compararlo
        const parsedCode = code as unknown as ApiErrorCode;

        // Verificamos si parsedCode es un valor válido en ApiErrorCode
        if (Object.values(ApiErrorCode).includes(parsedCode)) {
            return parsedCode;
        } else {
            // Devolvemos un valor por defecto, en este caso ValidationError, si no es válido
            return ApiErrorCode.ValidationError;
        }
    }
}