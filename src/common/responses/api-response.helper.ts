// src/common/responses/api-response.helper.ts
import { ApiResponse } from './api-response';
import { ErrorDetail } from './error-detail';  // Asegúrate de usar el enum correcto

export class ApiResponseHelper {
    static createSuccessResponse<T>(data: T, message: string = 'Operation completed successfully.'): ApiResponse<T> {
        return new ApiResponse<T>(true, 200, message, data);
    }

    static createSuccessResponseNoData(message: string = 'Operation completed successfully.'): ApiResponse<string> {
        return new ApiResponse<string>(true, 200, message, '');
    }

    static createErrorResponse<T>(message: string, statusCode: number = 500, errors: ErrorDetail[] = []): ApiResponse<T> {
        return new ApiResponse<T>(false, statusCode, message, null, '', errors);
    }

    static createValidationErrorResponse(validationErrors: ErrorDetail[], message: string = 'Validation failed.'): ApiResponse<string> {
        return new ApiResponse<string>(false, 400, message, '', '', validationErrors);
    }

    static createCustomResponse<T>(success: boolean, statusCode: number, message: string, data: T, errors: ErrorDetail[] = [], metadata: Record<string, any> = {}): ApiResponse<T> {
        return new ApiResponse<T>(success, statusCode, message, data, '', errors, metadata);
    }
}