import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { ApiResponseHelper } from '../responses/api-response.helper';
import { CustomException } from '../exceptions/custom-exception';
import { ApiErrorCode } from '../Enums/api-error-code.enum';

@Catch(HttpException)
export class GlobalExceptionHandler implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        let errorResponse;

        if (exception instanceof CustomException) {
            // Si es una CustomException, formateamos la respuesta con el código y mensaje personalizados
            errorResponse = ApiResponseHelper.createErrorResponse(
                exception.message,
                status,
                [{ code: exception.errorCode.toString(), description: exception.message }]
            );
        } else if (exception instanceof BadRequestException) {
            // Procesar los errores de validación lanzados por ValidationPipe
            const validationResponse = exception.getResponse() as any;
            
            // Verificamos si validationResponse tiene errores de validación
            const validationErrors = validationResponse.message;

            // Si hay errores de validación, los formateamos
            const formattedErrors = Array.isArray(validationErrors)
                ? validationErrors.map((error: any) => ({
                    code: ApiErrorCode.ValidationError.toString(),
                    description: typeof error === 'string' ? error : Object.values(error.constraints).join(', ')
                }))
                : [{
                    code: ApiErrorCode.ValidationError.toString(),
                    description: 'Invalid data'
                }];

            // Creamos la respuesta de error con los errores de validación formateados
            errorResponse = ApiResponseHelper.createErrorResponse(
                'Validation failed',
                status,
                formattedErrors
            );
        } else {
            // Para cualquier otro HttpException
            errorResponse = ApiResponseHelper.createErrorResponse(
                exception.message,
                status,
                [{ code: ApiErrorCode.UnknownError.toString(), description: 'An unexpected error occurred.' }]
            );
        }

        response.status(status).json(errorResponse);
    }
}