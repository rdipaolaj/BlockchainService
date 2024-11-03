// src/common/responses/api-response.ts
import { DatetimeHelper } from '@app/common/helpers/datetime.helper';
import { ErrorDetail } from './error-detail'; // Importar ErrorDetail

export class ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    transactionId: string;
    timestamp: Date;
    errors: ErrorDetail[];  // Usar ErrorDetail[]
    metadata: Record<string, any>;

    constructor(
        success: boolean,
        statusCode: number,
        message: string = '',
        data: T = null,
        transactionId: string = '',
        errors: ErrorDetail[] = [],
        metadata: Record<string, any> = {}
    ) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message || '';
        this.data = data || null;
        this.transactionId = transactionId || this.generateTransactionId();
        this.timestamp = DatetimeHelper.now(); // Uso del helper para obtener la fecha actual en la zona horaria correcta
        this.errors = errors;
        this.metadata = metadata;
    }

    private generateTransactionId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}