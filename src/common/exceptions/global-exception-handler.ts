import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
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