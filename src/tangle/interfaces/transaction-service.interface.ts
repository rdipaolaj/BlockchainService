// src/tangle/interfaces/transaction-service.interface.ts
import { ApiResponse } from '@app/common/responses/api-response';

export interface ITransactionService {
    registerTransaction(payloadData: any, tag: string): Promise<ApiResponse<any>>;
}