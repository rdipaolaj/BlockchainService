import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { ApiResponseHelper } from '../responses/api-response.helper';
import { CustomException } from '../exceptions/custom-exception';
import { ApiErrorCode } from '../enums/api-error-code.enum';

@Catch(HttpException)
export class GlobalExceptionHandler implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        let errorResponse;

        if (exception instanceof CustomException) {
            // Extracción del errorCode y message desde exception.getResponse()
            const customResponse = exception.getResponse() as any;
            const errorCode = customResponse.errorCode || ApiErrorCode.UnknownError.toString();
            const errorMessage = customResponse.message || 'Ocurrió un error desconocido.';

            console.log(`CustomException: ${errorCode} - ${errorMessage}`);
            console.log(customResponse);
            
            errorResponse = ApiResponseHelper.createErrorResponse(
                errorMessage,
                status,
                [{ code: errorCode, description: errorMessage }]
            );
        } else if (exception instanceof BadRequestException) {
            const validationResponse = exception.getResponse() as any;
            const validationErrors = validationResponse.message;

            const formattedErrors = Array.isArray(validationErrors)
                ? validationErrors.map((error: any) => ({
                    code: ApiErrorCode.ValidationError.toString(),
                    description: typeof error === 'string' ? error : Object.values(error.constraints).join(', ')
                }))
                : [{
                    code: ApiErrorCode.ValidationError.toString(),
                    description: 'Invalid data'
                }];

            errorResponse = ApiResponseHelper.createErrorResponse(
                'Validation failed',
                status,
                formattedErrors
            );
        } else {
            // Otros tipos de HttpException
            const errorCode = ApiErrorCode.UnknownError.toString();
            errorResponse = ApiResponseHelper.createErrorResponse(
                exception.message,
                status,
                [{ code: errorCode, description: 'An unexpected error occurred.' }]
            );
        }

        response.status(status).json(errorResponse);
    }
}